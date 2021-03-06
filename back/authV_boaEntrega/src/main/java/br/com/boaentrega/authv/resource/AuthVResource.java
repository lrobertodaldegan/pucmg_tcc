package br.com.boaentrega.authv.resource;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.RSAKeyProvider;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import br.com.boaentrega.authv.util.AwsCognitoKeyProvider;
import io.quarkus.logging.Log;

@Path("/authv/v1")
@Produces(MediaType.APPLICATION_JSON)
public class AuthVResource {

    private static final String CLIENT_ID = "client_id";

    @ConfigProperty(name = "app.clientid")
    String clientId;

    @ConfigProperty(name = "app.aws.cognito.region")
    String awsCognitoRegion;

    @ConfigProperty(name = "app.aws.cognito.userPool")
    String awsUserPoolId;

    @ConfigProperty(name = "app.validation.retries")
    int retries;

    @ConfigProperty(name = "app.validation.interval")
    int interval;

    @POST
    @Path("/validate")
    public Response validate(@HeaderParam("Authorization") String authorization) {
        final String token = authorization.replaceAll("Bearer ", "");

        Log.info(String.format("Iniciando validação do token %s", token));

        RSAKeyProvider keyProvider = new AwsCognitoKeyProvider(awsCognitoRegion, awsUserPoolId);
        
        Algorithm algorithm = Algorithm.RSA256(keyProvider);
                  
        Response res = doValidation(token, JWT.require(algorithm)
                                                .acceptLeeway(5l)
                                                .withClaim(CLIENT_ID, clientId)
                                                .build());
        
        if(res.getStatus() != 200){
            for(int i=0; i < retries; i++){
                try{
                    res = doValidation(token, JWT.require(algorithm)
                                                    .acceptLeeway(5l)
                                                    .withClaim(CLIENT_ID, clientId)
                                                    .build());
                    
                    if(res.getStatus() == 200)
                        break;
                    
                    Thread.sleep(interval);
                }catch(final Exception e){
                    Log.error("Houve um problema inesperado!!!", e);
                }
            }
        }

        return res;
    }

    private Response doValidation(final String token, JWTVerifier verifier){
        try{
            verifier.verify(token);

            Log.info(String.format("Token (%s) validado com sucesso!", token));

            return Response.ok().build();
        }catch(final Exception e){
            Log.error(String.format("Houve um problema ao tentar validar o token (%s)", token), e);

            return Response.status(Status.FORBIDDEN.getStatusCode()).build();
        }
    }
}
package br.com.boaentrega.suppliersms.service;

import java.net.HttpURLConnection;
import java.net.URL;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import br.com.boaentrega.suppliersms.exception.BusinessException;
import br.com.boaentrega.suppliersms.util.ConstantsUtil;
import io.quarkus.logging.Log;

@RequestScoped
public class AuthService {
	private static final String BEARER = "Bearer ";
	
    @ConfigProperty(name = "oauth.validation.endpoint")
    String validationEndpoint;

    public boolean validateToken(final String jwtToken) throws BusinessException {
        try{
            URL url = new URL(validationEndpoint);
            
            final String tokenTratado = jwtToken.startsWith(BEARER) ? jwtToken : BEARER + jwtToken; 

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod(ConstantsUtil.Connections.RestMethods.POST);
            con.setRequestProperty(ConstantsUtil.Connections.ACCEPT, MediaType.APPLICATION_JSON);
            con.setRequestProperty(ConstantsUtil.Connections.CONTENT_TYPE, MediaType.APPLICATION_JSON);
            con.setRequestProperty(ConstantsUtil.Connections.AUTHORIZATION, tokenTratado);
            // con.setDoOutput(true);

            // final String body = "{\"name\":\"Lucas\"}";

            // try(OutputStream os = con.getOutputStream()) {
            //     byte[] input = body.getBytes("utf-8");
            //     os.write(input, 0, input.length);			
            // }

            final int code = con.getResponseCode();

            if(code != 200){
                final String msg = con.getResponseMessage();

                throw new BusinessException(code, msg);
            }

            return true;
        } catch(final Exception e){
            Log.error("Houve um erro ao tentar validar o token de autenticação!", e);
            
            if(e instanceof BusinessException)
            	throw (BusinessException) e;
            
            throw new BusinessException();
        }
    }
}

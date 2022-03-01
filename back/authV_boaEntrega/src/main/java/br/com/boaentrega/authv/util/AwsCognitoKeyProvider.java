package br.com.boaentrega.authv.util;

import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.interfaces.RSAKeyProvider;

import java.net.URL;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import io.quarkus.logging.Log;

public class AwsCognitoKeyProvider implements RSAKeyProvider{
    private URL awsKidStoreUrl;
    private JwkProvider provider;

    public AwsCognitoKeyProvider(final String awsCognitoRegion, final String awsUserPoolId) {
        String url = String.format("https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json", 
                                    awsCognitoRegion, 
                                    awsUserPoolId);
        try {
            awsKidStoreUrl = new URL(url);

            provider = new JwkProviderBuilder(awsKidStoreUrl).build();
        } catch (final Exception e) {
            Log.error(String.format("Erro ao tentar processar a URL fornecida, URL=%s", url));
        }
    }


    @Override
    public RSAPublicKey getPublicKeyById(String kid) {
        try {
            return (RSAPublicKey) provider.get(kid).getPublicKey();
        } catch (final JwkException e) {
            final String msg = String.format("Houve um erro ao tentar obter a chave pública necessária! kid=%s, awsStoreUrl=%s", 
                                                kid, 
                                                awsKidStoreUrl);
            Log.error(msg);

            throw new RuntimeException(msg);
        }
    }

    @Override
    public RSAPrivateKey getPrivateKey() {
        return null;
    }

    @Override
    public String getPrivateKeyId() {
        return null;
    }
}
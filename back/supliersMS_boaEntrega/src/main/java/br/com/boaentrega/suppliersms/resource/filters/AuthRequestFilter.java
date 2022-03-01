package br.com.boaentrega.suppliersms.resource.filters;

import java.io.IOException;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import br.com.boaentrega.suppliersms.exception.BusinessException;
import br.com.boaentrega.suppliersms.model.ErrorResponse;
import br.com.boaentrega.suppliersms.service.AuthService;
import br.com.boaentrega.suppliersms.util.ConstantsUtil;
import br.com.boaentrega.suppliersms.util.ConstantsUtil.Connections.HttpsStatus;
import io.quarkus.logging.Log;

@Provider
public class AuthRequestFilter implements ContainerRequestFilter {
	
	@Inject
	AuthService service;

	@Override
	public void filter(ContainerRequestContext request) throws IOException {
		final String token = request.getHeaderString(ConstantsUtil.Connections.AUTHORIZATION);
		
		try {
			Log.info("Token recebido: " + token);
			
			if(!service.validateToken(token))
				request.abortWith(Response.status(HttpsStatus.ERROR)
											.entity(new ErrorResponse(HttpsStatus.ERROR, "Houve um erro ao tentar validar os dados de autenticação!"))
											.build());
		}catch(final BusinessException e){
			request.abortWith(Response.status(e.getCode())
										.entity(new ErrorResponse(e.getCode(), "Houve um erro ao tentar validar os dados de autenticação: " + e.getMessage()))
										.build());
		}catch(final Exception e){
			request.abortWith(Response.status(HttpsStatus.ERROR)
										.entity(new ErrorResponse(HttpsStatus.ERROR, "Houve um erro ao tentar validar os dados de autenticação: " + e.getMessage()))
										.build());
		}
	}

}

package br.com.boaentrega.suppliersms.resource;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import br.com.boaentrega.suppliersms.exception.BusinessException;
import br.com.boaentrega.suppliersms.exception.ExceptionCodeEn;
import br.com.boaentrega.suppliersms.model.Supplier;

@Path("/supplier/v1/")
public class SupplierResource {

    @GET
    public Response getAll(){
        final List<Supplier> all = Supplier.listAll();

        if(all != null && !all.isEmpty())
            return Response.ok(all).build();

        return Response.noContent().build();
    }

    @GET
    @Path("{document}")
    public Response get(@PathParam("document") String document){
        final Supplier c = Supplier.findByDocument(document);
        
        if(c != null)
            return Response.ok(c).build();
        
        return Response.noContent().build();
    }
    
    @POST
    public Response add(final Supplier supplier){
        try{
            if(supplier == null)
                throw new BusinessException(ExceptionCodeEn.BAD_REQUEST);

            supplier.persist();

            return Response.status(201).entity(supplier).build();
        } catch(final BusinessException e){
            return Response.status(e.getCode()).entity(e).build();
        } catch(final Exception ge){
            return Response.serverError().build();
        }
    }

    @PATCH
    public Response update(final Supplier supplier){
        try{
            if(supplier == null)
                throw new BusinessException(ExceptionCodeEn.BAD_REQUEST);

            final Supplier target = Supplier.findById(supplier.id);

            if(target == null)
                throw new BusinessException(ExceptionCodeEn.NOT_FOUND);

            supplier.persist();

            return Response.ok().build();
        } catch(final BusinessException e){
            return Response.status(e.getCode()).entity(e).build();
        } catch(final Exception ge){
            return Response.serverError().build();
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") Integer supplierId){
        try{
            if(supplierId == null)
                throw new BusinessException(ExceptionCodeEn.BAD_REQUEST);

            if(!Supplier.deleteById(supplierId))
                throw new BusinessException(ExceptionCodeEn.NOT_FOUND);

            return Response.ok().build();
        } catch(final BusinessException e){
            return Response.status(e.getCode()).entity(e).build();
        } catch(final Exception ge){
            return Response.serverError().build();
        }
    }
}

package br.com.boaentrega.suppliersms.exception;

public class BusinessException extends Exception{
    private int code;
    private String message;

    public BusinessException(){
        this(ExceptionCodeEn.SERVER_ERROR);
    }

    public BusinessException(final ExceptionCodeEn expCode){
        this.code = expCode.getCode();
        this.message = expCode.getMsg();
    }

    public BusinessException(final int code, final String msg){
        this.code = code;
        this.message = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

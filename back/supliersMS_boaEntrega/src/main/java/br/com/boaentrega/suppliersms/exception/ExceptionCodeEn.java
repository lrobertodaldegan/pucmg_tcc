package br.com.boaentrega.suppliersms.exception;

public enum ExceptionCodeEn {
    SERVER_ERROR(500,"Houve um erro ao tentar realizar a operação. Tente novamente mais tarde."),
    BAD_REQUEST(400, "Um objeto válido deve ser informado para a operação!"),
    NOT_FOUND(404, "O registro indicado não foi encontrado.");

    private String msg;
    private int code;

    private ExceptionCodeEn(final int code, final String msg){
        this.msg = msg;
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public int getCode() {
        return code;
    }
}

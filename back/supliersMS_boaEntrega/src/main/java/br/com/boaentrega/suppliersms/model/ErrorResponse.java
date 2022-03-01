package br.com.boaentrega.suppliersms.model;

public class ErrorResponse {
	private Integer code;
	private String message;
	
	public ErrorResponse() {}
	
	public ErrorResponse(Integer code, String msg) {
		this.setCode(code);
		this.setMessage(msg);
	}
	
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	@Override
	public String toString() {
		return String.format("ErrorResponse [code=%s, message=%s]", code, message);
	}
}

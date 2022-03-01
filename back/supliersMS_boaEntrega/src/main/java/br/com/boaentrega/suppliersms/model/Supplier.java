package br.com.boaentrega.suppliersms.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity(name="supplier_tb")
public class Supplier extends PanacheEntity{
    
	@Column(name="company_name")
	public String companyName;
	
	@Column(name="trad_name")
	public String tradingName;
	
	public String document;

	@Column(name="contact_name")
    public String contactName;
	
	@Column(name="contact_phone")
    public String contactPhone;
	
	@Column(name="contact_mail")
    public String contactMail;
    
    public String address;

    @Column(name="addr_complement")
    public String addrComplement;
    
    public String zipcode;

    @Column(name="addr_number")
    public Integer addrNumber;
    
    public String phone;
    public String mail;
    
    @Column(name="doc_type")
    public String docType;
    
    public static Supplier findByDocument(final String document){
        return find("document", document).firstResult();
    }
    
    public static List<Supplier> findByCompanyName(final String name){
        return find("companyName", name).list();
    }
    
    public static List<Supplier>  findByTradingName(final String name){
        return find("tradingName", name).list();
    }
}

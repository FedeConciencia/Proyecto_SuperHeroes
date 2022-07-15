
package Modelo;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class Heroe {
    
    //Atributos de la Clase =>
    
    private int idHeroe;
    private String nombre;
    private String bio;
    private String img;
    private LocalDate aparicion;
    private String casa;
    private int escalaPoder;
    private LocalDate fechaAlta;
    private LocalDate fechaBaja;
    private String estado;
    
    //Atributos de la Relacion con la Clase UnionHeroePoder 1:N =>
    
    private List<Union> listaUnion;
    
    //Constructores =>

    public Heroe() {
    }

    public Heroe(String nombre, String bio, String img, LocalDate aparicion, String casa, int escalaPoder, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.idHeroe = idHeroe;
        this.nombre = nombre;
        this.bio = bio;
        this.img = img;
        this.aparicion = aparicion;
        this.casa = casa;
        this.escalaPoder = escalaPoder;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }

    public Heroe(String nombre, String bio, String img, LocalDate aparicion, String casa, int escalaPoder, LocalDate fechaAlta, LocalDate fechaBaja, String estado, List<Union> listaUnion) {
        this.idHeroe = idHeroe;
        this.nombre = nombre;
        this.bio = bio;
        this.img = img;
        this.aparicion = aparicion;
        this.casa = casa;
        this.escalaPoder = escalaPoder;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
        this.listaUnion = listaUnion;
    }

    public Heroe(int idHeroe, String nombre, String bio, String img, LocalDate aparicion, String casa, int escalaPoder, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.idHeroe = idHeroe;
        this.nombre = nombre;
        this.bio = bio;
        this.img = img;
        this.aparicion = aparicion;
        this.casa = casa;
        this.escalaPoder = escalaPoder;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }
    
    
    
    //Getters and Setters =>

    public int getIdHeroe() {
        return idHeroe;
    }

    public void setIdHeroe(int idHeroe) {
        this.idHeroe = idHeroe;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public LocalDate getAparicion() {
        return aparicion;
    }

    public void setAparicion(LocalDate aparicion) {
        this.aparicion = aparicion;
    }

    public String getCasa() {
        return casa;
    }

    public void setCasa(String casa) {
        this.casa = casa;
    }

    public int getEscalaPoder() {
        return escalaPoder;
    }

    public void setEscalaPoder(int escalaPoder) {
        this.escalaPoder = escalaPoder;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public LocalDate getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(LocalDate fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    
    public List<Union> getListaUnion() {
        return listaUnion;
    }

    public void setListaUnion(List<Union> listaUnion) {
        this.listaUnion = listaUnion;
    }

    
    //Metodo toString =>

    @Override
    public String toString() {
        return "idHeroe: " + idHeroe + "\nnombre: " + nombre + "\nbio: " + bio + "\nimg: " + img + 
                "\naparicion: " + aparicion + "\ncasa: " + casa + "\nescalaPoder: " + escalaPoder +
                "\nfechaAlta: " + fechaAlta + "\nfechaBaja: " + fechaBaja + "\nestado: " + estado;
    }
    
    
    
}


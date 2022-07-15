
package Modelo;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class Poderes {
    
    //Atributos de la clase =>
    private int idPoderes;
    private String nombre;
    private LocalDate fechaAlta;
    private LocalDate fechaBaja;
    private String estado;
    
    //Atributo de la relacion =>
    private List<Union> listaUnion;
    
    //Constructores =>

    public Poderes() {
    }

    public Poderes(int idPoderes, String nombre, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.idPoderes = idPoderes;
        this.nombre = nombre;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }

    public Poderes(int idPoderes, String nombre, LocalDate fechaAlta, LocalDate fechaBaja, String estado, List<Union> listaUnion) {
        this.idPoderes = idPoderes;
        this.nombre = nombre;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
        this.listaUnion = listaUnion;
    }

    public Poderes(String nombre, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.nombre = nombre;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }
    
    
    //Getters and Setters =>

    public int getIdPoderes() {
        return idPoderes;
    }

    public void setIdPoderes(int idPoderes) {
        this.idPoderes = idPoderes;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    
    
    //Metodo GetString para mostrar el objeto =>

    @Override
    public String toString() {
        return "idPoderes: " + idPoderes + "\nnombre: " + nombre +
                "\nfechaAlta: " + fechaAlta + "\nfechaBaja: " + fechaBaja + "\nestado: " + estado;
    }
    
    
}


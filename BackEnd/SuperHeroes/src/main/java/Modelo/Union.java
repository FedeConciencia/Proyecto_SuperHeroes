
package Modelo;


import java.time.LocalDate;


public class Union {
    
    //Variables de Clase => 
    
    private int idUnion;
    private int idHeroe;
    private int idPoderes;
    private LocalDate fechaAlta;
    private LocalDate fechaBaja;
    private String estado;
    
    //Variables de relacion =>
    
    private Heroe heroe;
    private Poderes poderes;
    
    //Constructores =>

    public Union() {
    }

    public Union(int idUnion, int idHeroe, int idPoderes, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.idUnion = idUnion;
        this.idHeroe = idHeroe;
        this.idPoderes = idPoderes;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }

    public Union(int idUnion, int idHeroe, int idPoderes, LocalDate fechaAlta, LocalDate fechaBaja, String estado, Heroe heroe, Poderes poderes) {
        this.idUnion = idUnion;
        this.idHeroe = idHeroe;
        this.idPoderes = idPoderes;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
        this.heroe = heroe;
        this.poderes = poderes;
    }

    public Union(int idHeroe, int idPoderes, LocalDate fechaAlta, LocalDate fechaBaja, String estado) {
        this.idHeroe = idHeroe;
        this.idPoderes = idPoderes;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.estado = estado;
    }
    
    

   
    //Getters and Setters =>

    public int getIdUnion() {
        return idUnion;
    }

    public void setIdUnion(int idUnion) {
        this.idUnion = idUnion;
    }

    public int getIdHeroe() {
        return idHeroe;
    }

    public void setIdHeroe(int idHeroe) {
        this.idHeroe = idHeroe;
    }

    public int getIdPoderes() {
        return idPoderes;
    }

    public void setIdPoderes(int idPoderes) {
        this.idPoderes = idPoderes;
    }

    public Heroe getHeroe() {
        return heroe;
    }

    public void setHeroe(Heroe heroe) {
        this.heroe = heroe;
    }

    public Poderes getPoderes() {
        return poderes;
    }

    public void setPoderes(Poderes poderes) {
        this.poderes = poderes;
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
    
   
    //Metodo ToString =>

    @Override
    public String toString() {
        return "idUnion: " + idUnion + "\nidHeroe: " + idHeroe + "\nidPoderes: " + idPoderes +
                "\nfechaAlta: " + fechaAlta + "\nfechaBaja: " + fechaBaja + "\nestado: " + estado;
    }
    
    
     
}


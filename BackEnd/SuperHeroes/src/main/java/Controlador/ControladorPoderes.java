
package Controlador;


import Conexion.Conexion;
import Modelo.Poderes;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControladorPoderes {

    //METODO PARA INSERTAR PODERES:
    public void insertarPoderes(Poderes poderes) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO poderes (nombre, fechaAlta, fechaBaja, estado) VALUES (?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, poderes.getNombre());
            ps.setDate(2, Date.valueOf(poderes.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(3, Date.valueOf(poderes.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(4, poderes.getEstado());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue insertado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue insertado con exito a la Base de Datos.");
                //out.print("<script>alert('El Registro fue insertado con exito a la Base de Datos.');<script>");

            } else {

                System.out.println("Error al intentar insertar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar insertar el registro.");
                //out.print("<script>alert('Error al intentar insertar el registro.');<script>");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);
            //out.print("<script>alert('Error de Conexion.');<script>");

        } finally {

            try {

                ps.close(); //Cerramos el objeto PreparedStatement

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
                //out.print("<script>alert('Error de Conexion.');<script>");
            }

        }
    }

    //METODO PARA GESTIONAR ACTUALIZACION PODERES:
    public void actualizarPoderes(Poderes poderes) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE poderes SET nombre = ?, fechaAlta = ?, fechaBaja = ?, estado = ?  WHERE idPoderes = ? ");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, poderes.getNombre());
            ps.setDate(2, Date.valueOf(poderes.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(3, Date.valueOf(poderes.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(4, poderes.getEstado());
            ps.setInt(5, poderes.getIdPoderes());

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue actualizado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue modificado con exito a la Base de Datos.");

            } else {

                System.out.println("Error al intentar actualizar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar modificar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO BUSCAR ONE PODERES:
    public Poderes buscarOnePoderes(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Poderes poderes = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM poderes WHERE idPoderes = ?");

            ps.setInt(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                int idPoderes = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                LocalDate fechaAlta = (rs.getDate(3)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(4)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(5);

                poderes = new Poderes(idPoderes, nombre, fechaAlta, fechaBaja, estado);

                System.out.println("El Registro fue encontrado con exito.");
                //JOptionPane.showMessageDialog(null, "El Registro fue encontrado con exito.");

            } else {

                System.out.println("El Registro no fue encontrado en la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro no fue encontrado en la Base de Datos.");
            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return poderes; //devolvemos el heroe encontrado
    }

    //OBTENER ALL PODERES:
    public List<Poderes> buscarAllPoderes() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Poderes poderes = null;
        List<Poderes> listaPoderes = new ArrayList<Poderes>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM poderes");

            rs = ps.executeQuery();

            while (rs.next()) {

                int idPoderes = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                LocalDate fechaAlta = (rs.getDate(3)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(4)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(5);

                poderes = new Poderes(idPoderes, nombre, fechaAlta, fechaBaja, estado);

                listaPoderes.add(poderes); //Agregamos a la coleccion el objeto encontrado

            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return listaPoderes; //devolvemos la lista de dinosaurios encontrado

    }

    //DELETE LOGICO PODERES A TRAVES DE UPDATE:
    public void eliminarLogicoPoderes(int id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE poderes SET fechaBaja = ?, estado = ?  WHERE idPoderes = ? ");

            ps.setDate(1, Date.valueOf(fecha)); //Trabajamos en java con LocalDate
            ps.setString(2, "inactivo");
            ps.setInt(3, id);

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado (Logico) de la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue modificado con exito a la Base de Datos.");

            } else {

                System.out.println("Error al intentar actualizar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar modificar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {

                System.err.println("Error. " + ex);
            }

        }

    }

    //METODO ELIMINAR PODERES:
    public void eliminarPoderes(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM poderes WHERE idPoderes = ?");

            ps.setInt(1, id); //Se puede usar indicando el primer signo de pregunta del qwery y alojar la variable

            //Ejecutamos el comando y mandamos los datos al sistema:
            int resultado = ps.executeUpdate();

            if (resultado > 0) {

                System.out.println("El Registro fue eliminado con exito a la Base de Datos.");
                //JOptionPane.showMessageDialog(null, "El Registro fue eliminado con exito a la Base de Datos.");

            } else {

                System.out.println("Error al intentar eliminar el registro.");
                //JOptionPane.showMessageDialog(null, "Error al intentar eliminar el registro.");
            }

            conexion.close(); //cerramos la conexion.

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {
                ps.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

    }

}


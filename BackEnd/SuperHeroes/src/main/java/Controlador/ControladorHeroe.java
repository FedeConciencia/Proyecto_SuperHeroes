
package Controlador;


import Conexion.Conexion;
import Modelo.Heroe;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorHeroe {
    
    //METODO PARA INSERTAR HEROE:
    public void insertarHeroe(Heroe heroe) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO heroe (nombre, bio, img, aparicion, casa, escalaPoder, fechaAlta, fechaBaja, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, heroe.getNombre());
            ps.setString(2, heroe.getBio());
            ps.setString(3, heroe.getImg());
            ps.setDate(4, Date.valueOf(heroe.getAparicion())); //Se trabaja en java con LocalDate
            ps.setString(5, heroe.getCasa());
            ps.setInt(6, heroe.getEscalaPoder());
            ps.setDate(7, Date.valueOf(heroe.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(8, Date.valueOf(heroe.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(9, heroe.getEstado());

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

    //METODO PARA GESTIONAR ACTUALIZACION HEROE:
    public void actualizarHeroe(Heroe heroe) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE heroe SET nombre = ?, bio = ?, img = ?, aparicion = ?, casa = ?, escalaPoder = ?, fechaAlta = ?, fechaBaja = ?, estado = ?  WHERE idHeroe = ? ");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, heroe.getNombre());
            ps.setString(2, heroe.getBio());
            ps.setString(3, heroe.getImg());
            ps.setDate(4, Date.valueOf(heroe.getAparicion())); //Se trabaja en java con LocalDate
            ps.setString(5, heroe.getCasa());
            ps.setInt(6, heroe.getEscalaPoder());
            ps.setDate(7, Date.valueOf(heroe.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(8, Date.valueOf(heroe.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(9, heroe.getEstado());
            ps.setInt(10, heroe.getIdHeroe());

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

    //METODO BUSCAR ONE HEROE:
    public Heroe buscarOneHeroe(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Heroe heroe = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM heroe WHERE idHeroe = ?");

            ps.setInt(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                int idHeroe = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                String bio = rs.getString(3);
                String img = rs.getString(4);
                LocalDate aparicion = (rs.getDate(5)).toLocalDate(); //En java trabajamos con LocalDate
                String casa = rs.getString(6);
                int escalaPoder = rs.getInt(7);
                LocalDate fechaAlta = (rs.getDate(8)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(9)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(10);

                heroe = new Heroe(idHeroe, nombre, bio, img, aparicion, casa, escalaPoder, fechaAlta, fechaBaja, estado);

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

        return heroe; //devolvemos el heroe encontrado
    }

    //OBTENER ALL HEROE:
    public List<Heroe> buscarAllHeroe() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Heroe heroe = null;
        List<Heroe> listaHeroes = new ArrayList<Heroe>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM heroe");

            rs = ps.executeQuery();

            while (rs.next()) {

                int idHeroe = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String nombre = rs.getString(2);
                String bio = rs.getString(3);
                String img = rs.getString(4);
                LocalDate aparicion = (rs.getDate(5)).toLocalDate(); //En java trabajamos con LocalDate
                String casa = rs.getString(6);
                int escalaPoder = rs.getInt(7);
                LocalDate fechaAlta = (rs.getDate(8)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(9)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(10);

                heroe = new Heroe(idHeroe, nombre, bio, img, aparicion, casa, escalaPoder, fechaAlta, fechaBaja, estado);

                listaHeroes.add(heroe); //Agregamos a la coleccion el objeto encontrado

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

        return listaHeroes; //devolvemos la lista de dinosaurios encontrado

    }

    //DELETE LOGICO HEROE A TRAVES DE UPDATE:
    public void eliminarLogicoHeroe(int id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE heroe SET fechaBaja = ?, estado = ?  WHERE idHeroe = ? ");

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

    //METODO ELIMINAR HEROE:
    public void eliminarHeroe(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM heroe WHERE idHeroe = ?");

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
    
    //METODO PARA OBTENER LOS PODERES ASOCIADOS AL HEROE =>
    public List<String> obtenerPoderes(int id){
        
        Connection conexion = null;
        Conexion con = new Conexion();
        List<String> listaPoderes = new ArrayList<String>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("select p.nombre from poderes as p inner join union_heroe_poderes as u on p.idPoderes = u.idPoderes\n" +
                                           "inner join heroe as h on h.idHeroe = u.idHeroe where h.idHeroe = ?;");

            ps.setInt(1, id); //Se puede usar indicando el primer signo de pregunta del qwery y alojar la variable
            
            rs = ps.executeQuery();

            while (rs.next()) {

                String poder = rs.getString(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona

                listaPoderes.add(poder); //Agregamos a la coleccion el objeto encontrado

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
    
}

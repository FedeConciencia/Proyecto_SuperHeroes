
package Controlador;


import Conexion.Conexion;
import Modelo.Union;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class ControladorUnion {
    
    //METODO PARA INSERTAR PODERES:
    public void insertarUnion(Union union) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("INSERT INTO union_heroe_poderes (idHeroe, idPoderes, fechaAlta, fechaBaja, estado) VALUES (?, ?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, union.getIdHeroe());
            ps.setInt(2, union.getIdPoderes());
            ps.setDate(3, Date.valueOf(union.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(4, Date.valueOf(union.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(5, union.getEstado());

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

    //METODO PARA GESTIONAR ACTUALIZACION UNION:
    public void actualizarUnion(Union union) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE union_heroe_poderes SET idHeroe = ?, idPoderes = ?, fechaAlta = ?, fechaBaja = ?, estado = ?  WHERE idUnion = ? ");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setInt(1, union.getIdHeroe());
            ps.setInt(2, union.getIdPoderes());
            ps.setDate(3, Date.valueOf(union.getFechaAlta())); //Se trabaja en java con LocalDate
            ps.setDate(4, Date.valueOf(union.getFechaBaja())); //Se trabaja en java con LocalDate
            ps.setString(5, union.getEstado());
            ps.setInt(6, union.getIdUnion());

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

    //METODO BUSCAR ONE UNION:
    public Union buscarOneUnion(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        Union union = null;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT *  FROM union_heroe_poderes WHERE idUnion = ?");

            ps.setInt(1, id); //pasamos el id parametro y se ingresa en el ? del query

            rs = ps.executeQuery();  //Ejecutamos el Resulset y executeQuery cuando obtenemos algo de la base de datos.

            if (rs.next()) {  //si nos devuelve un dato true

                int idUnion = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int idHeroe = rs.getInt(2);
                int idPoderes = rs.getInt(3);
                LocalDate fechaAlta = (rs.getDate(4)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(5)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(6);

                union = new Union(idUnion, idHeroe, idPoderes, fechaAlta, fechaBaja, estado);

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

        return union; //devolvemos el heroe encontrado
    }

    //OBTENER ALL PODERES:
    public List<Union> buscarAllUnion() {

        Connection conexion = null;
        Conexion con = new Conexion();
        Union union = null;
        List<Union> listaUnion = new ArrayList<Union>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT * FROM union_heroe_poderes");

            rs = ps.executeQuery();

            while (rs.next()) {

                int idUnion = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int idHeroe = rs.getInt(2);
                int idPoderes = rs.getInt(3);
                LocalDate fechaAlta = (rs.getDate(4)).toLocalDate(); //En java trabajamos con LocalDate
                LocalDate fechaBaja = (rs.getDate(5)).toLocalDate(); //En java trabajamos con LocalDate
                String estado = rs.getString(6);

                union = new Union(idUnion, idHeroe, idPoderes, fechaAlta, fechaBaja, estado);

                listaUnion.add(union); //Agregamos a la coleccion el objeto encontrado

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

        return listaUnion; //devolvemos la lista de dinosaurios encontrado

    }

    //DELETE LOGICO UNION A TRAVES DE UPDATE:
    public void eliminarLogicoUnion(int id, LocalDate fecha) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("UPDATE union_heroe_poderes SET fechaBaja = ?, estado = ?  WHERE idUnion = ? ");

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

    //METODO ELIMINAR UNION:
    public void eliminarUnion(int id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("DELETE FROM union_heroe_poderes WHERE idUnion = ?");

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


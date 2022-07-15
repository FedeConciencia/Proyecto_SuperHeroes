
package Servlet;


import Controlador.ControladorHeroe;
import Modelo.Heroe;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.RequestContext;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.output.*;


/*
    Importante Servelt en Servidor TomCast version 10 =>

    en version nueva de Servidor TomCat 10_9 se importa jakarta.servlet por javax.servlet
    importar libreria gson 2.8.2.jar, tiene que ser aplicacion o proyecto web
    importar libreria apache-commons.jar
    importar libreria commons-io-2.6.jar
    importar libreria commons-fileupload-1.4.jar
    In the project window, right-click <libraries>. Then click <Add Library>. then choose <Java EE Web API Library>

*/        

//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/SuperHeroes/HeroesServlet?
@WebServlet(name = "HeroesServlet", urlPatterns = {"/HeroesServlet"})
public class HeroeServlet extends HttpServlet {
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Modificando el response.setContentType y agregando charset=UTF-8 soluciona problema de caracteres como ñ en react:
        //https://blog.continuum.cl/generar-una-respuesta-json-desde-java-en-utf-8-e68392ae4587
        
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        
        PrintWriter out = response.getWriter();
        String respuestaServer = "";
        try {
            
            mostrarElementos(request, response);
            if(request.getParameter("action") != null){
                System.out.println("ACTION " + request.getParameter("action"));
                if(request.getParameter("action").equals("buscarAll")){
                    
                    ControladorHeroe controlador = new ControladorHeroe();
                    List<Heroe> listaHeroe = controlador.buscarAllHeroe();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String json = gsonBuilder.toJson(listaHeroe);
                    respuestaServer = json;
                    
                }else if(request.getParameter("action").equals("buscarOne")){
                    
                    ControladorHeroe controlador = new ControladorHeroe();    
                    Heroe heroe = controlador.buscarOneHeroe(Integer.parseInt(request.getParameter("idHeroe"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(heroe);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String nombre = (request.getParameter("nombre"));
                    String bio = (request.getParameter("bio"));
                    String img = (request.getParameter("img"));
                    LocalDate aparicion = LocalDate.parse(request.getParameter("aparicion"));
                    String casa = (request.getParameter("casa"));
                    int escalaPoder =  Integer.parseInt(request.getParameter("escalaPoder"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    
                    ControladorHeroe controlador = new ControladorHeroe(); 
                    Heroe heroe = new Heroe(nombre, bio, img, aparicion, casa, escalaPoder, fechaAlta, fechaBaja, estado);
                    controlador.insertarHeroe(heroe);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(heroe);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    int idHeroe = Integer.parseInt(request.getParameter("idHeroe"));
                    String nombre = (request.getParameter("nombre"));
                    String bio = (request.getParameter("bio"));
                    String img = (request.getParameter("img"));
                    LocalDate aparicion = LocalDate.parse(request.getParameter("aparicion"));
                    String casa = (request.getParameter("casa"));
                    int escalaPoder =  Integer.parseInt(request.getParameter("escalaPoder"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorHeroe controlador = new ControladorHeroe(); 
                    Heroe heroe = new Heroe(idHeroe, nombre, bio, img, aparicion, casa, escalaPoder, fechaAlta, fechaBaja, estado);
                    controlador.actualizarHeroe(heroe);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(heroe);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorHeroe controlador = new ControladorHeroe(); 
                    controlador.eliminarHeroe(Integer.parseInt(request.getParameter("idHeroe")));
                    List<Heroe> listaHeroe = controlador.buscarAllHeroe();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(listaHeroe);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    int idHeroe = Integer.parseInt(request.getParameter("idHeroe"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorHeroe controlador= new ControladorHeroe(); 
                    controlador.eliminarLogicoHeroe(idHeroe, fechaBaja);
                    List<Heroe> listaHeroe = controlador.buscarAllHeroe();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(listaHeroe);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("obtenerPoderes")){
                    
                    int idHeroe = Integer.parseInt(request.getParameter("idHeroe"));
                    
                    //Obtenemos los poderes asociados al heroe =>
                    ControladorHeroe controlador= new ControladorHeroe(); 
                    List<String> listaPoderes = controlador.obtenerPoderes(idHeroe);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(listaPoderes);
                    respuestaServer = Json;
                    
                }    
            }
            out.write(respuestaServer);
        }catch(Exception ex){
            ex.printStackTrace();
        } finally {
            out.close();
        }
    }
    
    private void mostrarElementos(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException{
        try { 
            
            
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            response.setContentType("text/html");
            
            if(!isMultipart ) {
                System.out.println("NO ES MULTIPART");
                return;
            }

            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);

        
           // Parse the request to get file items.
           List fileItems = upload.parseRequest((RequestContext) request);

           // Process the uploaded file items
           Iterator i = fileItems.iterator();

           while ( i.hasNext () ) {
                FileItem fi = (FileItem)i.next();
                // Get the uploaded file parameters
                String fieldName = fi.getFieldName();
                String value = fi.getString();
                System.out.println("FieldName: " + fieldName);
                System.out.println("VALOR: " + value);
           }
           
           } catch(Exception ex) {
              System.out.println(ex);
           }
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
    
}


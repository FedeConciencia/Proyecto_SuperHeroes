
package Servlet;

import Controlador.ControladorPoderes;
import Modelo.Poderes;
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

//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/SuperHeroes/PoderesServlet?
@WebServlet(name = "PoderesServlet", urlPatterns = {"/PoderesServlet"})
public class PoderesServlet extends HttpServlet {
    
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
                    
                    ControladorPoderes controlador = new ControladorPoderes();
                    List<Poderes> listaPoderes = controlador.buscarAllPoderes();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String json = gsonBuilder.toJson(listaPoderes);
                    respuestaServer = json;
                    
                }else if(request.getParameter("action").equals("buscarOne")){
                    
                    ControladorPoderes controlador = new ControladorPoderes();    
                    Poderes poderes = controlador.buscarOnePoderes(Integer.parseInt(request.getParameter("idPoderes"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(poderes);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String nombre = (request.getParameter("nombre"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    
                    ControladorPoderes controlador = new ControladorPoderes(); 
                    Poderes poderes = new Poderes(nombre, fechaAlta, fechaBaja, estado);
                    controlador.insertarPoderes(poderes);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(poderes);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    int idPoderes = Integer.parseInt(request.getParameter("idPoderes"));
                    String nombre = (request.getParameter("nombre"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorPoderes controlador = new ControladorPoderes(); 
                    Poderes poderes = new Poderes(idPoderes, nombre, fechaAlta, fechaBaja, estado);
                    controlador.actualizarPoderes(poderes);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(poderes);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorPoderes controlador = new ControladorPoderes(); 
                    controlador.eliminarPoderes(Integer.parseInt(request.getParameter("idPoderes")));
                    List<Poderes> listaPoderes = controlador.buscarAllPoderes();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String Json = gsonBuilder.toJson(listaPoderes);
                    respuestaServer = Json;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    int idPoderes = Integer.parseInt(request.getParameter("idPoderes"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorPoderes controlador= new ControladorPoderes(); 
                    controlador.eliminarLogicoPoderes(idPoderes, fechaBaja);
                    List<Poderes> listaPoderes = controlador.buscarAllPoderes();
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

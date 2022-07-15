
package Principal;


import Controlador.ControladorHeroe;
import Controlador.ControladorPoderes;
import Controlador.ControladorUnion;
import Modelo.Heroe;
import Modelo.Poderes;
import Modelo.Union;
import java.time.LocalDate;
import java.util.List;


public class Principal {
    
    public static void main(String[] args) {
        
        //TESTEO CONTROLADOR HEROE =>
        
        /*
        
        //Prueba Insertar Heroe BD (Funciona Ok)=>
        ControladorHeroe controlador = new ControladorHeroe();
        Heroe heroe = new Heroe("Spiderman", "es una araña", "spiderman.jpg",  LocalDate.parse("2009-12-09"), "dc", 8, LocalDate.parse("2022-06-01"), LocalDate.parse("1900-01-01"), "inactivo");
        
        controlador.insertarHeroe(heroe);
        
        */

 
        /*
        
        //Prueba Actualizar Heroe BD (Funciona Ok)=>
        ControladorHeroe controlador = new ControladorHeroe();
        Heroe heroe = new Heroe(1,"Batman", "es un murcielago", "batman.jpg",  LocalDate.parse("2009-12-09"), "dc", 8, LocalDate.parse("2022-06-01"), LocalDate.parse("2022-06-01"), "activo");
        
        controlador.actualizarHeroe(heroe);

        */
        
        /*
        
        //Prueba BuscarOne Heroe BD (Funciona Ok)=>
        ControladorHeroe controlador = new ControladorHeroe();
        Heroe heroe = controlador.buscarOneHeroe(1);
        
        System.out.println(heroe.toString());

        */
        
        /*
        
        //Prueba BuscarAll Heroe BD (Funciona Ok)=>
        ControladorHeroe controlador = new ControladorHeroe();
        List<Heroe> lista = controlador.buscarAllHeroe();
        
        for(Heroe item:lista){
        
            System.out.println(item.toString());
            
        }
        
        */

        
        
        /*
        
        //Prueba EliminarLogico Heroe BD (Funciona Ok)=>
        ControladorHeroe controlador = new ControladorHeroe();
        
        controlador.eliminarLogicoHeroe(1, LocalDate.parse("2022-01-10"));

        */
        
        /*
        
        //Prueba obtenerPoderes BD (Funciona Ok)=> =>
        ControladorHeroe controlador = new ControladorHeroe();
        List<String> listaPoderes = controlador.obtenerPoderes(1);
        
        for(String item: listaPoderes){
            
            System.out.println(item);
            System.out.println("");
            
        }
        
        */
        
        
        
        // ------------------------------------
        
        
        
        //TESTEO CONTROLADOR PODERES =>
        
        /*
        
        //Prueba insertar Poderes BD (Funciona Ok)=>
        
        ControladorPoderes controlador = new ControladorPoderes();
        Poderes poderes = new Poderes("Fuerza",  LocalDate.parse("2022-06-01"), LocalDate.parse("1900-01-01"), "activo");
        
        controlador.insertarPoderes(poderes);
        
        */

       
        /*
        
        //Prueba actualizar Poderes BD (Funciona Ok)=>
        
        ControladorPoderes controlador = new ControladorPoderes();
        Poderes poderes = new Poderes(1, "Super Velocidad",  LocalDate.parse("2022-07-06"), LocalDate.parse("2022-01-01"), "activo");
        
        controlador.actualizarPoderes(poderes);

        */
        
        /*
        
        //Prueba buscarOne Poderes BD (Funciona Ok)=>
        
        ControladorPoderes controlador = new ControladorPoderes();
        
        Poderes poderes = controlador.buscarOnePoderes(1);
        
        System.out.println(poderes.toString());

        */
        
        /*
        
        //Prueba buscarAll Poderes BD (Funciona Ok)=>
        
        ControladorPoderes controlador = new ControladorPoderes();
        
        List<Poderes> lista = controlador.buscarAllPoderes();
        
        for(Poderes item:lista){
            
            System.out.println(item.toString());
            
        }

        */
        
        /*
        
        //Prueba EliminarLogico Poderes BD (Funciona Ok)=>
        
        ControladorPoderes controlador = new ControladorPoderes();
        
        controlador.eliminarLogicoPoderes(1, LocalDate.parse("2022-06-01"));

        */
        
        // ------------------------------------
        
       
        //TESTEO CONTROLADOR UNION =>
        
        /*
        
        //Prueba insertar Union BD (Funciona Ok)=>
        
        ControladorUnion controlador = new ControladorUnion();
        Union union = new Union(1,1,LocalDate.parse("2022-07-06"), LocalDate.parse("2022-01-01"), "activo");
        
        controlador.insertarUnion(union);

        */
        
        /*
        
        //Prueba actualizar Union BD (Funciona Ok)=>
        
        ControladorUnion controlador = new ControladorUnion();
        Union union = new Union(1,2,2,LocalDate.parse("2022-07-06"), LocalDate.parse("1900-01-01"), "activo");
        
        controlador.actualizarUnion(union);

        */
        
        /*
        
        //Prueba buscarOne Union BD (Funciona Ok)=>
        
        ControladorUnion controlador = new ControladorUnion();
        Union union = controlador.buscarOneUnion(1);
        
        System.out.println(union.toString());

        */
        
        /*
        
        //Prueba buscarAll Union BD (Funciona Ok)=>
        
        ControladorUnion controlador = new ControladorUnion();
        List<Union> lista = controlador.buscarAllUnion();
        
        for(Union item:lista){
            
            System.out.println(item.toString());
            
        }

        */
        
        /*
        
        //Prueba eliminarLogico Union BD (Funciona Ok)=>
        
        ControladorUnion controlador = new ControladorUnion();
        controlador.eliminarLogicoUnion(1, LocalDate.parse("2022-06-01"));

        */
        

        
    }
    
}

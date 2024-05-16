/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calculadora;

/**
 *
 * @author Blurryface
 */

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

@Stateless
@Path("/operaciones")
public class calcula 
{
    @GET
    @Path("suma")
    public double Suma(@QueryParam("num1")double num1,@QueryParam("num2") double num2){
        return num1+num2;
    }
    
    
    @GET
    @Path("resta")
    public double resta(@QueryParam("numeroUno")double numeroUno,@QueryParam("numeroDos") double numeroDos)      
    {
        return numeroUno-numeroDos;
    }
    
    @GET
    @Path("factorial")
    public double factorial(@QueryParam("base")double base) {

        if (base >= 1) {
            return factorial(base - 1) * base;
        }
        return 1;
    }
    
    @GET
    @Path("multiplicacion")
    public double multiplicacion(@QueryParam("numeroUno")double numeroUno,@QueryParam("numeroDos") double numeroDos)
    {
        return numeroUno*numeroDos;
    }
    
    @GET
    @Path("division")
    public double division(@QueryParam("numero_1")double numero_1,@QueryParam("numero_2")double numero_2)
    {
        return numero_1 / numero_2;
    }
    
    @GET
    @Path("potencia")
    public double potencia(@QueryParam("num1")double num1,@QueryParam("num2")double num2)
    {
        return Math.pow(num1, num2);
    }
    
    @GET
    @Path("modulo")
    public double modulo(@QueryParam("num1") double num1,@QueryParam("num2") double num2)
    {
        return num1%num2;
    }
    
    @GET
    @Path("raizCuadrada")
    public double raizCuadrada(@QueryParam("raiz") double raiz)        
    {
        return Math.sqrt(raiz);
    }
    
    @GET
    @Path("logaritmo")
    public double logaritmo(@QueryParam("log") double log )
    {
        return Math.log(log);
    }
    
    @GET
    @Path("sin")
    public double sen(@QueryParam("seno") double seno){
        return Math.sin(seno);
    }
    
    @GET
    @Path("cos")
    public double cos(@QueryParam("cos") double cos){
        return Math.cos(cos);
    }
    
    @GET
    @Path("tan")
    public double tan(@QueryParam("tan") double tan){
        return Math.cos(tan);
    }
    
    @GET
    @Path("e")
    public double e(@QueryParam("e") double e){
        return Math.exp(e);
    }
    
    @GET
    @Path("sinh")
    public double senh(@QueryParam("senoh") double senoh){
        return Math.sinh(senoh);
    }
    
    @GET
    @Path("cosh")
    public double cosh(@QueryParam("cosh") double cosh){
        return Math.cos(cosh);
    }
    
    @GET
    @Path("tanh")
    public double tanh(@QueryParam("tanh") double tanh){
        return Math.tanh(tanh);
    }
}
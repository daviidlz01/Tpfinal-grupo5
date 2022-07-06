import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/login';
import { Notificacion } from 'src/app/models/notificaciones';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { NotificacionesService } from 'src/app/service/notificaciones.service';
import { RecursosService } from 'src/app/services/recursos.service';
import { ReunionService } from 'src/app/services/reunion.service';


@Component({
  selector: 'app-ctrl-reuniones',
  templateUrl: './ctrl-reuniones.component.html',
  styleUrls: ['./ctrl-reuniones.component.css']
})
export class CtrlReunionesComponent implements OnInit {


  reunion: Reunion
  participantes: Array<Empleado>=[];
  recursosAgregar: Array<Recurso>=[];
  participantesAgregar: Array<Empleado>=[];
  recursos: Array<Recurso>=[];
  participante: Empleado;
  recurso: Recurso;
  notificacion:Notificacion;


  constructor(private notificacionService:NotificacionesService,private empleadoService:EmpleadoService, private recursoService: RecursosService, private reunionService:ReunionService) { 
    this.reunion= new Reunion();
    this.participantes= new Array<Empleado>();
    this.notificacion = new Notificacion();
    this.participantesAgregar= new Array<Empleado>();
    this.recursosAgregar= new Array<Recurso>();
    this.participante= new Empleado();
    this.recursos= new Array<Recurso>();
    this.recurso= new Recurso();

  }
  agregarNotificacion(mensaje:string){
    this.notificacion.mensaje = mensaje;
    this.notificacion.usuario = this.participantesAgregar
    this.notificacionService.crearNotificaciones(this.notificacion).subscribe(
      result =>{
        console.log(result)
      }
    )
  }
  altaReunion(){
   var mensaje = "Reunion"
    this.reunion.participantes = this.participantesAgregar;
    this.reunion.recursos = this.recursosAgregar;
    this.reunion.estado = "no realizada";
    console.log(this.reunion)
    this.reunionService.addReunion(this.reunion).subscribe(
      result=>{
        console.log(result);
      }
    )
    this.agregarNotificacion(mensaje);
  }
  getReuniones(){

  }

  getParticipantes(){
  
    var empleado: Empleado;
    this.empleadoService.getEmpleados().subscribe(
      result=>{
         this.participantes=new Array <Empleado>();
         result.forEach((element:Empleado)=>{
          empleado=new Empleado();
          Object.assign(empleado,element);
          this.participantes.push(empleado);
          empleado=new Empleado();
         })
         console.log(this.participantes)
      }
    )
  }

  getRecursos(){
    this.recursoService.getRecurso().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.recurso= new Recurso();
          Object.assign(this.recurso,element);
          this.recursos.push(this.recurso);
          this.recurso= new Recurso();
      
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  agregarParticipantes(part:Empleado){
    if(part._id!=null){
     this.participantesAgregar.push(part);
     var index=-1;
     var c=0;
     this.participantes.forEach((element:Empleado)=>{
       if(part._id==element._id){
         index=c;
       }
       c++;
     });
     this.participantes.splice(index,1);
   }
   }
  
  quitarParticipante(part:Empleado){
   
    this.participantesAgregar.splice(this.participantesAgregar.indexOf(part),1);
    this.participantes.push(part);
  }
  agregarRecursos(recu:Recurso){
    if(recu._id!=null){
      this.recursosAgregar.push(this.recurso);
      var index=-1;
      var c=0
      this.recursos.forEach((element:Recurso)=>{  
        if(recu._id==element._id){
          index=c;
        }
        c++;
      });
      this.recursos.splice(index,1);
    }
    console.log(this.recursosAgregar)
  }
  quitarRecursos(recu:Recurso){
    this.recursosAgregar.splice(this.recursosAgregar.indexOf(recu),1);
    this.recursos.push(recu);
  }

  ngOnInit(): void {
    this.getParticipantes()
    this.getRecursos()
    console.log(sessionStorage.getItem("admin"))
  }

}

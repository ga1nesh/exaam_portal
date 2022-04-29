import { Component, OnInit } from '@angular/core';
import { interval, subscribeOn } from 'rxjs';


import { QuestionserviceService } from '../questionservice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string="";
  public questionList : any=[];
  public currentQuestion: number= 0;
  public points: number=0;
  public progress:string='0';
  counter=40;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$:any;
  constructor(private questionService : QuestionserviceService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestion();
    this.startCounter();
  }

  getAllQuestion(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList= res.question;
      
    })
   
  }
  nextQuestion(){
    this.currentQuestion++;
    this.counter=40;
  }
  prevQuestion(){
    this.currentQuestion--;

  }
  answer(currentQuestion:number,option:any){
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      this.currentQuestion++;
      this.getprogress();
    }else{
      this.points-=10;
      this.currentQuestion++;
      this.incorrectAnswer++;
      this.getprogress();
    }
  }
  startCounter(){
   this.interval$=interval(1000)
   .subscribe(val=>{
     this.counter--;
     if(this.counter==0){
       this.currentQuestion++;
       this.counter=40;
       this.points-=10;
     }
   });
   setTimeout(() =>{
     this.interval$.unsubscribe();
   },40000);



  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;


  }
  resetCounter(){
    this.stopCounter();
    this.counter=40;
    this.startCounter();

  }
 /* resetQuiz(){
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=40;
    this.currentQuestion=0;
  }*/
  getprogress(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString()
    return this.progress;
  }
  
}


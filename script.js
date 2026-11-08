const questions = [
  {q:"Kontya mahinat aapan ekmekanchya premat padalo?",a:["February","January","April"],correct:0},
  {q:"Aapli pahili unofficial date / bhet kontya divashi zali?",a:["22 February","21 February","23 February"],correct:0},
  {q:"What sweet nickname do I use for you?",a:["My-Sha","Sunshine","Princess"],correct:0},
  {q:"Which month is special in our story?",a:["February","May","December"],correct:0},
  {q:'Who says "I love you" more?',a:["Rahul","Shamal","Both"],correct:2},
  {q:"Who is the birthday star today?",a:["Rahul","Shamal","Both"],correct:1}
];
let current=0, points=0, answered=false;
const qEl=document.getElementById("question"), answersEl=document.getElementById("answers");
const feedback=document.getElementById("feedback"), next=document.getElementById("next");
function renderQuestion(){
  answered=false; const item=questions[current];
  document.getElementById("progress").textContent=`Question ${current+1} of ${questions.length}`;
  qEl.textContent=item.q; answersEl.innerHTML=""; feedback.textContent=""; next.hidden=true;
  item.a.forEach((answer,index)=>{
    const button=document.createElement("button"); button.className="answer"; button.textContent=answer;
    button.addEventListener("click",()=>chooseAnswer(index,button)); answersEl.appendChild(button);
  });
}
function chooseAnswer(index,button){
  if(answered)return; answered=true;
  const item=questions[current]; const all=[...answersEl.children]; all.forEach(b=>b.disabled=true);
  all[item.correct].classList.add("correct");
  if(index===item.correct){points++;feedback.textContent="That's right! You remember our story. 💗";}
  else{button.classList.add("wrong");feedback.textContent=`The correct answer is ${item.a[item.correct]}. ❤️`;}
  next.textContent=current===questions.length-1?"See my message 💌":"Next question →";next.hidden=false;
}
next.addEventListener("click",()=>{
  current++;
  if(current<questions.length)renderQuestion();
  else{document.getElementById("quiz-box").hidden=true;document.getElementById("result").hidden=false;document.getElementById("result-text").textContent=`You got ${points} out of ${questions.length}. Every moment with you is a favourite memory!`;}
});
function restartQuiz(){current=0;points=0;document.getElementById("quiz-box").hidden=false;document.getElementById("result").hidden=true;renderQuestion();}
window.restartQuiz=restartQuiz;renderQuestion();
const music=document.getElementById("bg-music"), musicBtn=document.getElementById("music-toggle");
musicBtn.addEventListener("click",async()=>{if(music.paused){try{await music.play();musicBtn.textContent="♫ Pause music";}catch(e){musicBtn.textContent="Add song.mp3 first";}}else{music.pause();musicBtn.textContent="♫ Play music";}});

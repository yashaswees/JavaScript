const obj={
    _name:'Yashaswee',
    address:'Kathmandu',
    email:'yashaswee50@gmail.com',
    interests:'art, music, video games',
    education:[
        {name:'Bachelor in Computer Engineering',enrolledDate:"January 2018"}
    ]
}

for (let i = 0; i < obj.education.length; i++) {
  let edu = obj.education[i];
  console.log("Name: " +edu.name + " , Date: " + edu.enrolledDate);
}

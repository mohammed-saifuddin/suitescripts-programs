function factorial(){
    let num=5;
    let res=1;
    for(let i=1;i<=num;i++){
       res *=i;
    }
    console.log(res)
}
function armstrong_number(){
    let num=153;
    let len=num.toString().length;
    let temp=num;
    let sum=0;
    while(temp>0){
      let rem=temp%10;
      sum +=Math.pow(rem,len)
      temp=Math.floor(temp/10)

    }
    if(sum===num){
        console.log("it is armstrong number");
    }
    else{
        console.log("it is not armstrong number")
    }
}
function sum_of_digit(){
    let n=123;
    let sum=0;
    let temp=n;
    let len=n.toString().length;
    while(temp>0){
      let rem=temp%10;
      sum +=rem;
      temp=Math.floor(temp/10)
    }
    console.log(sum);
}
function even_odd(){
    let num=12
    if(num%2==0){
        console.log("it is even")

    }
    else{
        console.log("its odd")
    }
}
function prime(){
    num=7;
    let isPrime=true
    if(num<=1){
        isPrime=false
    }
    for(let i=2;i<num;i++)
    {
        if(num%i==0){
            isPrime=false;
            break
        }
    }
    if(isPrime){
        console.log("prime number")
    }
    else{
        console.log("not a prime number")
    }
}
function max(){
    let arr=[20,30,40,50]
    let max=arr[0]
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]>max)
        {
            max=arr[i]
        }
    }
    console.log(max)
}
function min(){
   let arr=[50,20,30,10,100]
   let min=arr[0]
   for(let i=0;i<arr.length;i++)
   {
    if(arr[i]<min)
    {
        min=arr[i]
    }
   }
}
 factorial()
 armstrong_number()
 sum_of_digit()
 even_odd()
 prime()
 max()
 min()

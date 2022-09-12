# JTrello

Drag And Drop을 통한 애자일 보드를 구현

https://wkdtpzld.github.io/JTrello

-------

## Preview

[screen-recording (2).webm](https://user-images.githubusercontent.com/87063105/189778471-94954ec7-616e-4df9-aecc-dc9852bf6426.webm)

------


  .
<img src="https://img.shields.io/badge/Typescript-192a56?style=flat-square&logo=typescript&logoColor=white"/> 
<img src="https://img.shields.io/badge/React-487eb0?style=flat-square&logo=react&logoColor=white"> 
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square&logo=styledComponents&logoColor=white"> 
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=flat-square&logo=reactquery&logoColor=white"> 
<img src="https://img.shields.io/badge/recoil-40AEF0?style=flat-square&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/reactHookForm-EC5990?style=flat-square&logo=reactHookForm&logoColor=white"> 


React-Beautiful-dnd 를 통한 Drag and Drop을 구현해보았습니다.

------

## 중요하게 봤던 점.


### React-Beautiful-dnd

역시 가장 중요한건 React-Beautiful-dnd 였습니다. 해당 웹 서비스에서 가장 중요한 역할이었기 떄문에 고민을 가장 많이 하였습니다.

![image](https://user-images.githubusercontent.com/87063105/189781221-b1dbb2f6-77bc-4d61-8a30-1410b0aea6d9.png)

생각보다 사용법이 쉬운것 같으면서도 어려웠습니다.

예를 들어서 현재 Board[...ToDos] 가 입력되어있고 ToDo => TrashCan으로 보낼수는 있지만

고의적으로 **Board는 TrashCan에 보내는것을 막아두었습니다.**

이러한 작업을 통해서 react-beautiful-dnd 에 대한 이해도를 상승시켰습니다.



### Recoil

Redux를 사용하여 Flux 아키텍쳐를 사용해 왔지만 Reocoil에 대한 정보를 얻을 수 있었고 Flux 방식보다 훨씬 편안하게 사용할 수 있어서 좋았습니다.

![image](https://user-images.githubusercontent.com/87063105/189780966-e416c2b0-5437-4e27-948b-93438c1aea1a.png)

또한 recoilPersist를 사용하여 로컬스토리지에 저장하는 방식에 대하여 알게되었습니다.

해당 함수를 사용함으로서 직접 localstorage에 입력하는 번거러움이 없어졌으며 코드 또한 보기쉽게 이해가 되었습니다.

### JS

기본적인 이야기겠지만 자료구조 알고리즘을 공부했음에 불구하고
React의 랜더링 방식인 Mutate를 사용하지 않고 새로운 데이터를 구성해 내보내야 함에 많은 고민을 하였습니다.

![image](https://user-images.githubusercontent.com/87063105/189780924-6f426a57-bbfd-4dab-a7cb-79bbc2d83ab0.png)

### Reack-hook-form

Hooks를 사용하여 Form형식에 대한 validation 코드 단축을 하게 되었습니다.

![image](https://user-images.githubusercontent.com/87063105/189781782-a5e868af-5e1e-48cf-948c-78d079233d90.png)

![image](https://user-images.githubusercontent.com/87063105/189781925-78379750-140e-4c35-8bc6-83b1d63f6c84.png)

해당 Hook을 사용함으로서 입력값에 대한 state 관리코드가 매우 적어졌으며 코드의 가독성 또한 좋아졌습니다.

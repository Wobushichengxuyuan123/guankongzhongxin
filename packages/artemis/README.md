# Getting Started with Create React App

#### 服务启动之后
  client: 用来区分 [管控平台 presenter] 与 [一般成员 viewer]
```Javascript
  // 主持人访问
  window.open('http://localhost:3000/?client=presenter')
  // 观众访问
  window.open('http://localhost:3000/?client=viewer')
```

#### artemis 使用方式

 - RootPanelContainer/RootPanelContainer.jsx 入口文件
 - RootPanelContainer/CallDemo.jsx 示例文件
 
 #### CallDemo 示例文件
```Javascript
  import { presenterArtemis, viewerArtemis } from "Artemis";


  let artemis;
  // 需要改成自己本地服务地址。
  const server = 'wss://192.168.1.15:8443';
  const options = {
      // 是否开启组件内部的 console.log 打印
      logger: true,
      // $root就必须传！
      // 如果需要视频会议，视频画面将在 $root 中创建。
      $videoContainer: document.getElementById('meetingRoot'),
        

      // 用来处理用户在线状态。
      // socket 连接成功时，返回已在线用户的ID列表
      onlineAlready: (onlineList) => {
        props.onlineAlready(onlineList);
        console.log(onlineList, props.userListData)
      },
      // 用户上线通知
      anyoneOnline: (online) => {
        props.anyoneOnline(online);
        console.log(online)
      },
      // 用户线下通知
      anyoneOffline: (offline) => {
        props.anyoneOffline(offline);
        console.log(offline)
      },
      answerSuccess (isConnect) {
      
      },
      fail (error) {
      
      }
    };

    // 主持人调用
    artemis = presenterArtemis(server, {
        ...options,
        presenterId: props.userId,
        presenterName: props.username,
    });

    // 观众调用
    artemis = viewerArtemis(server, {
        ...options,
        viewerId: props.userId,
        viewerName: props.username,
    });

```

#### 发起广播
```javascript
    /**
    * @param ID[] 发起广播; 广播对象的 ID 数组
    */
    artemis.onBroadcast([1111111, 22222222, 3333333]);

``` 

#### 视频会议
```javascript
    /**
    * 发起视频会议
    * 
    * @param video 是否显示视频
    * @param roomId 会议ID
    * @param roomName 会议名称
    * @param presenterId 发起会议的 主持人ID
    * @param presenterName 发起会议的 主持人名字
    * @param checked 强行拉入会议的用户 ID 数组
    */
    artemis.createMeeting({
        video: false,
        roomId: data.roomId,
        roomName: data.roomName,
        presenterId: props.userId,
        presenterName: props.username,
        checked: props.checked
    });

    /**
    * 加入视频会议
    * 
    * @param roomId 会议ID
    * @param roomName 会议名称
    * @param viewerId 参与者ID
    * @param viewerName 参与者名字
    */
    artemis.joinRoom({
        roomId: data.roomId,
        roomName: data.roomName,
        viewerId: props.userId,
        viewerName: props.username,
    });

``` 

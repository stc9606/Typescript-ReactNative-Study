import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Button, TextInput, PermissionsAndroid} from 'react-native';
import RtcEngine from 'react-native-agora';


const requestCameraAndAudioPermission = async () => {
    try{
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
        if (granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('you can use the mic');
        } else {
            console.log('Permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

interface Props {

}

interface State {
    appId : string,
    token : string,
    channelName : string,
    joinSucceed: boolean,
    openMicrophone: boolean,
    enableSpeakerphone: boolean,
    peerIds: number[],
}



export default class Main extends Component<Props, State> {
    _engine? : RtcEngine

    constructor(props : any) {
        super(props)

        this.state = {
            appId: 'yourAppId',
            token: 'yourToken',
            channelName: 'yourChannel',
            openMicrophone: true,
            enableSpeakerphone: true,
            joinSucceed: false,
            peerIds: [],
        }
        if(Platform.OS === 'android') {
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!');
            })
        }
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const {appId} = this.state;
        this._engine = await RtcEngine.create(appId);

        //오디오 장치에 연결
        await this._engine.enableAudio();

        //채널 가입에 성공했을때 CallBack 함수.
        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)

            const { peerIds } = this.state

            /* uid가 존재할 경우에만 peerId 제공 */
            if(peerIds.indexOf(uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, uid]
                })
            }

        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);

            const {peerIds} = this.state;
            this.setState({
                // Peer ID 삭제
                peerIds: peerIds.filter(id => id !== uid)
            })
        });
        
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            this.setState({
                joinSucceed: true
            })
        });
    }

    /* 채널 가입 함수 */
    _joinChannel = async () => {
        await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
    }
   
    /* 음성통화 중 사용자는 사용자 인터페이스의 버튼을 클릭해서 마이크를 On/Off 및 오디오 On/Off 할 수 있음. */
    // 나의 마이크 On/Off 함수
    _switchMicrophone = () => {
        const { openMicrophone } = this.state;
        this._engine?.enableLocalAudio(!openMicrophone).then(() => {
            this.setState({
                openMicrophone: !openMicrophone
            });
        }).catch((err) => {
            console.warn('enableLocalAudio', err);
        })
    }

    //상대방 오디오 On/Off 함수
    _switchSpeakerphone = () => {
        const { enableSpeakerphone } = this.state;
        this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
            this.setState({
                enableSpeakerphone: !enableSpeakerphone
            })
        }).catch((err) => {
            console.warn('setEnableSpeakerphone', err)
        })
    }    

    /* 채널에서 나가기 함수 */
    _leaveChannel = async () => {
        await this._engine?.leaveChannel()
        this.setState({
            peerIds: [],
            joinSucceed: false
        })
    }

    render() {
        const {
            channelName,
            joinSucceed,
            openMicrophone,
            enableSpeakerphone
        } = this.state;

        return (
            <View style={style.container}>
                <View style={style.top}>
                    <TextInput 
                        style={style.input}
                        onChangeText={(text) => this.setState({ channelName: text })}
                        placeholder={'Channel Name'}
                        value={channelName}
                    />
                    <Button 
                        onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
                        title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                    />
                </View>
                <View style={style.float}>
                    <Button
                        onPress={this._switchMicrophone}
                        title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                    />
                    <Button
                        onPress={this._switchSpeakerphone}
                        title={`Microphone ${enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}`}
                    />
                </View>
            </View>
        )
    }

    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    float: {                
        // position: 'absolute',
        // right: 0,
        // bottom: 0
    },
    top: {
        width: '100%'
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1
    }
})
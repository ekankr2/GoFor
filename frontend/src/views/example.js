import React, {Component} from 'react'
import './App.css'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import YoutubePlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import data from './car.json'
import showIcon from './show.svg'
import Script from 'react-load-script'
import {isMobile, isIOS} from 'react-device-detect';

class App extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.player = React.createRef();

        const videoIds = data.map((elem, id) => {
            return (elem.video_id[0]);
        });

        const videoNames = data.map((elem, id) => {
            return (elem.city);
        });
        const selected_city = Math.floor(Math.random() * data.length);
        const selected_video = Math.floor(Math.random() * data[selected_city].video_id.length);
        const selected_radio = Math.floor(Math.random() * data[selected_city].radio_url.length);
        const currentVideo = data[selected_city].video_id[selected_video];

        this.state = {
            countryCode: '',
            videoIds: videoIds,
            time: new Date().getTime(),
            times: {},
            a: 0,
            videoNames: videoNames,
            selected_city: selected_city,
            selected_radio: selected_radio,
            selected_video: selected_video,
            playbackRate: 1.0,
            currentVideo: currentVideo,
            visible: true,
            canPlay: false,
            isMuted: true,
            isPlaying: false,
            isPaused: false,
            isEnded: false,
            isFirst: isMobile,
            isOpen: !isMobile,
            volume: 25,
        };
    }

    getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            if (data.hasOwnProperty('country_name')) {
                this.setState({
                    countryCode: data.country_code
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.getGeoInfo();

    }

    changeRate(rate) {
        if (rate > 2.0) {
            rate = 1.0;
        }
        this.setState({
            playbackRate: rate
        });
    }

    changeCity(index) {
        const city = this.state.selected_city;
        const times = this.state.times;
        const videoId = this.state.currentVideo;
        times[videoId] = this.state.a;
        if (index !== city) {
            const vid_id = Math.floor(Math.random() * data[index].video_id.length);
            this.setState({
                ready: false,
                currentVideo: data[index].video_id[vid_id],
                selected_city: index,
                selected_radio: Math.floor(Math.random() * data[index].radio_url.length),
                selected_video: vid_id,
                times: times,
            });
        } else {
            const i = this.state.selected_video;
            if (i + 1 < data[this.state.selected_city].video_id.length) {
                this.setState({
                    ready: false,
                    currentVideo: data[this.state.selected_city].video_id[i + 1],
                    selected_city: index,
                    selected_video: i + 1,
                    selected_radio: 0,
                    times: times,
                });
            } else if (i !== 0) {
                this.setState({
                    ready: false,
                    currentVideo: data[this.state.selected_city].video_id[0],
                    selected_city: index,
                    selected_video: 0,
                    selected_radio: 0,
                    times: times,
                });
            }
        }
    }

    changeRadio(isNext) {
        this.setState({isPlaying: false, canPlay: false});
        if (isNext) {
            if (this.state.selected_radio + 1 === data[this.state.selected_city].radio_url.length) {
                this.setState({selected_radio: 0});
            } else {
                this.setState({selected_radio: this.state.selected_radio + 1});
            }
        } else {
            if (this.state.selected_radio === 0) {
                this.setState({selected_radio: data[this.state.selected_city].radio_url.length - 1});
            } else {
                this.setState({selected_radio: this.state.selected_radio - 1});
            }
        }
    }

    handleProgress = state => {
        this.setState({a: Math.round(state['playedSeconds'])});
    }

    toggleRadio() {
        this.setState({isOpen: true});
        if (this.state.canPlay || this.state.isFirst) {
            if (this.state.isPlaying) {
                this.myRef.current.audioEl.current.pause();
            } else {
                this.myRef.current.audioEl.current.play();
            }
            this.setState({
                isFirst: false,
                isPlaying: !this.state.isPlaying,
                isPaused: !this.state.isPaused
            });
        }
    }

    showHide() {
        this.setState({
            visible: !this.state.visible
        });
    }

    ready(val) {
        this.setState({
            isEnded: !val,
            ready: val
        });
    }

    audioOnPlay() {
        this.setState({isPlaying: true, isPaused: false})
    }

    audioOnPause() {
        this.setState({isPlaying: false, isPaused: true})
    }

    audioOnCanPlay() {
        if (!this.state.isPaused) this.myRef.current.audioEl.current.play();
        this.setState({canPlay: true})
    }

    render() {
        const {
            currentVideo, videoIds, videoNames, selected_radio, selected_city, selected_video, times, time, isOpen,
            countryCode, volume, visible, ready, playbackRate, canPlay, isMuted, isPlaying, isPaused, isEnded, isFirst
        } = this.state;

        //const adCountries = ['IN','SG','AE','JO','US','CA','OM','RU','DE','BG','EG','GH','GE'];
        const adCountries = ['DE', 'ID', 'IN', 'SG', 'CN', 'HK', 'AE', 'JO', 'CA', 'OM', 'RU', 'BG', 'EG', 'GH', 'PK', 'KW', 'ZA', 'QA', 'BR', 'SA', 'AZ', 'JP', 'MY', 'ES', 'UA', 'GE', 'AR', 'GR', 'SE', 'AM'];
        const isWide = window.innerWidth > 800;
        const donateTime = new Date().getTime() - time > 100000;
        //const urlRef = document.referrer
        //const noAd = /reddit|ycombinator|linkedin/.test(urlRef);
        //const prob = Math.floor(Math.random() * 100) < 50;
        //const monetize = (!noAd && !isWide && prob && adCountries.includes(countryCode));
        const monetize = false;
        const isTr = (countryCode === 'TR');
        const startStr = isTr ? (
            <p>Başlamak için tıklayın<br/>(Daha iyi bir deneyim için masaüstünden giriş yapın!)</p>) : (
            <p>Click here to start<br/>(It is better on desktop!)</p>);
        const streetNoiseStr = isTr ? ('Sokak Sesi') : ('Street Noise');
        const carSpeedStr = isTr ? ('Araba Hızı') : ('Car Speed');

        //const videoSourceStr = isTr?''
        //const followMeStr = isTr?'Takip Et!':'Follow us!';

        //const monetize2 = (!isWide && countryCode!=='' && countryCode!=='TR');
        const adScript = monetize ? <Script
            url="https://msgose.com/pw/waWQiOjEwNzc5OTMsInNpZCI6MTA4NjM0OSwid2lkIjoxNzYzOTUsInNyYyI6Mn0=eyJ.js"
            attributes={{
                'async': "async"
            }}
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}/> : '';

        const bmcScript = donateTime ? <Bmc city={videoNames[selected_city]}/> : '';
        const videoButtons = videoIds.map((id, index) => {

            return (
                <li key={id}>
                    <div className='Button Cities' id={id === data[selected_city].video_id[0] ? 'active' : ''}
                         onClick={() => this.changeCity(index)}> {(id === data[selected_city].video_id[0]) ? (videoNames[index] + ', ' + data[selected_city].country) : videoNames[index]} </div>
                </li>
            );
        });
        const rateButtons = [1.0, 1.5, 2.0].map((val, index) => {
            return (
                <li key={index}>
                    <Col className='Button Rates' id={playbackRate === val ? 'active' : ''}
                         onClick={() => this.changeRate(val)}> {val}x </Col>
                </li>
            );
        });
        const coffeeButton = <Col key='coffee' className='footerCol'><a className="bmc-button" target="_blank"
                                                                        style={{"alignItems": "center"}}
                                                                        href="https://www.buymeacoffee.com/erkam?ref=dnl0"><span
            style={{"fontSize": "28px !important"}}>Buy me a coffee</span><img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/></a></Col>


        var _t = 0;
        if (times.hasOwnProperty(currentVideo)) {
            _t = times[currentVideo];
        } else {
            if (data[selected_city].hasOwnProperty('start_times')) {
                _t = data[selected_city].start_times[selected_video];

            } else {
                _t = 40;
            }
        }
        const t = _t;
        const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo + '&t=' + t;
        const radioName = (isMobile && isFirst) ? 'Click first' : ((!canPlay) ? data[selected_city].name[selected_radio] + ' loading...' : data[selected_city].name[selected_radio]);
        if (isMobile && !isWide) {
            return (
                <div className="App">
                    <div className="video-background">
                        <div className="video-foreground">
                            {(isOpen) ? <YoutubePlayer
                                id="youtube-player"
                                playbackRate={playbackRate}
                                ref={this.player}
                                url={videoUrl}
                                onProgress={this.handleProgress}
                                onPlay={() => this.ready(true)}
                                onEnded={() => this.changeCity(selected_city)}
                                onError={() => this.changeCity(selected_city)}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            rel: 0,
                                            autoplay: 1,
                                            showinfo: 0,
                                            controls: 0,
                                            origin: 'http://192.168.0.20:3000',
                                            playsinline: 1
                                        }
                                    },
                                    attributes: {
                                        autoPlay: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
                                        preload: "none"
                                    }
                                }}
                                controls={false}
                                playing={!isMobile || !isFirst}
                                volume={1.0}
                                muted={isMuted}/> : ''}
                        </div>
                    </div>
                    {(isFirst) ? <div id='mobile-noise' onClick={() => {
                        this.toggleRadio()
                    }}>{startStr}</div> : ''}
                    {(isEnded) ?
                        <div className='end-bg'><h1>Drive & Listen</h1> <br/> <p>Wow! You really like it. Now select a
                            city to continue, or just listen to the radio :) <br/> You can also <a target="_blank"
                                                                                                   href="https://buymeacoffee.com/erkam">make
                                a donation</a></p></div> : ''}
                    <div className="mobileHeader">
                        <p>Drive & Listen</p>
                    </div>
                    <p className="layer" onClick={() => this.showHide()}
                       style={{"alignItems": "center", "margin": "10px"}} href="https://www.buymeacoffee.com/erkam"><img
                        src={showIcon} alt="Show"/></p>
                    {(visible) ? <div className="navbar">
                        <Row className="zero-margin">
                            <Col sm={4} xs={4}>
                                <CitiesPopup videoIds={videoIds}
                                             data={data}
                                             selected_city={selected_city}
                                             onClick={(index) => this.changeCity(index)}/>
                            </Col>
                            <Col sm={4} xs={4}> <Col className='mobileButton'
                                                     onClick={() => {
                                                         this.changeRate(playbackRate + 0.5)
                                                     }}> {carSpeedStr} <br/>{playbackRate}x </Col> </Col>
                            <Col sm={4} xs={4}> <Col className='mobileButton' id={!isMuted ? 'active' : ''}
                                                     onClick={() => {
                                                         this.setState({isMuted: !this.state.isMuted});
                                                     }}> {streetNoiseStr}<br/> {isMuted ? 'OFF' : 'ON'} </Col></Col>

                        </Row>
                        <Row className="zero-margin">
                            <Col className='mobileButtonSet'>
                                <p style={(isMobile && isFirst) ? {'color': 'gold'} : {}}>{radioName}</p>
                                <Row id='mobilePlayerBox'>
                                    <Col sm={2} xs={2} style={(isIOS) ? {'height': '50px'} : {}}
                                         className='radioPlayer pre' onClick={() => {
                                        this.changeRadio(false)
                                    }}></Col>
                                    <Col sm={2} style={(isIOS) ? {'height': '50px'} : {}}
                                         className={isPlaying ? 'radioPlayer pause' : 'radioPlayer play'}
                                         onClick={() => {
                                             this.toggleRadio()
                                         }}><img alt=''/></Col>
                                    <Col sm={2} xs={2} style={(isIOS) ? {'height': '50px'} : {}}
                                         className='radioPlayer next' onClick={() => {
                                        this.changeRadio(true)
                                    }}></Col>
                                </Row>
                                {!isIOS ? <Row id="mobileSlidecontainer">
                                    <Col>
                                        <input onChange={() => {
                                            this.setState({volume: event.target.value})
                                        }} type="range" min="1" max="100" value={volume} className="slider"
                                               id="myRange"/>
                                    </Col>
                                </Row> : ''}
                            </Col>
                        </Row>
                        <Row className='footer'>
                            <Col className='footerCol'><a id='footer-link' target="_blank"
                                                          href='https://instagram.com/driveandlisten'>Instagram</a></Col>
                            {coffeeButton}
                            <Col className='footerCol'><a id='footer-link' target="_blank"
                                                          href={'https://www.youtube.com/watch?v=' + currentVideo}>Video
                                source</a></Col>
                        </Row>
                    </div> : ''}
                    <ReactAudioPlayer
                        key={data[selected_city].radio_url[selected_radio]}
                        ref={this.myRef}
                        id='audio'
                        src={!isFirst ? data[selected_city].radio_url[selected_radio] : ''}
                        onPlay={() => {
                            this.audioOnPlay()
                        }}
                        onCanPlay={() => {
                            this.audioOnCanPlay()
                        }}
                        onPause={() => {
                            this.audioOnPause()
                        }}
                        autoPlay={!isMobile || !isFirst}
                        volume={volume / 100.0}
                        controls={false}/>
                    {adScript}{bmcScript}
                </div>
            );
        }

        return (
            <div className="App">
                <div className="video-background">
                    <div className="video-foreground">

                        {(isOpen) ? <YoutubePlayer
                            id="youtube-player"
                            playbackRate={playbackRate}
                            ref={this.player}
                            url={videoUrl}
                            onPlay={() => this.ready(true)}
                            onProgress={this.handleProgress}
                            onEnded={() => this.changeCity(selected_city)}
                            onError={() => this.changeCity(selected_city)}
                            config={{
                                youtube: {
                                    playerVars: {
                                        rel: 0,
                                        autoplay: 1,
                                        showinfo: 0,
                                        controls: 0,
                                        origin: 'http://192.168.0.20:3000',
                                        playsinline: 1
                                    }
                                },
                                attributes: {
                                    autoPlay: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
                                    preload: "none",
                                    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                }
                            }}
                            controls={false}
                            playing={!isMobile || !isFirst}
                            volume={1.0}
                            muted={isMuted}/> : ''}
                    </div>
                </div>

                {((!isMobile && !ready) || (isMobile && isFirst)) ?
                    <div id={isMobile ? 'mobile-noise' : 'noise'} onClick={isMobile ? () => {
                        this.toggleRadio()
                    } : null}>{isMobile ? <p>Click here to start</p> : ''}</div> : ''}
                {(!isMobile && (!ready || (!isPlaying && !isPaused))) ?
                    <div key={data[selected_city].radio_url[selected_radio]} id='hid'>

                    </div> : ''}
                {(isEnded) ?
                    <div className='end-bg'><h1>Drive & Listen</h1> <br/> <p>Wow! You really like it. Now select a city
                        to continue, or just listen to the radio :) <br/> You can also <a target="_blank"
                                                                                          href="https://buymeacoffee.com/erkam">make
                            a donation</a></p></div> : ''}
                <p className="layer" onClick={() => this.showHide()} style={{"alignItems": "center"}}
                   href="https://www.buymeacoffee.com/erkam"><img src={showIcon} alt="Show"/></p>
                <div className='panel'>
                    {(visible) ? (
                        <Container fluid id='panel'>
                            <h1 className='panelButton'>Drive & Listen</h1>
                            <Row id='row'>
                                <Col className='buttonSet'>
                                    <p>Scroll down for more cities</p>
                                    <div id='buttonBox'>
                                        <ol>{videoButtons}</ol>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={true} md={5} className='rowCol'><p>{carSpeedStr}</p></Col>
                                <Col lg={true} className='rowCol right'>
                                    <Row className='right' style={{'textAlign': 'center'}}>{rateButtons}</Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={true} className='rowCol right'><p>{streetNoiseStr}</p></Col>
                                <Col lg={true} className='Button rowCol right no-right-margin'
                                     id={!isMuted ? 'active' : ''}
                                     onClick={() => {
                                         this.setState({isMuted: !this.state.isMuted});
                                     }}> {isMuted ? 'OFF' : 'ON'} </Col>
                            </Row>
                            <Row id='row'>
                                <Col className='buttonSet'>
                                    <p style={(isMobile && isFirst) ? {'color': 'gold'} : {}}>{radioName}</p>
                                    <Row id='playerBox'>
                                        <Col sm={2} xs={2} className='radioPlayer pre' onClick={() => {
                                            this.changeRadio(false)
                                        }}><img alt=''/></Col>
                                        <Col sm={2} className={isPlaying ? 'radioPlayer pause' : 'radioPlayer play'}
                                             onClick={() => {
                                                 this.toggleRadio()
                                             }}><img alt=''/></Col>
                                        <Col sm={2} xs={2} className='radioPlayer next' onClick={() => {
                                            this.changeRadio(true)
                                        }}><img alt=''/></Col>
                                    </Row>
                                    <Row id="slidecontainer">
                                        <Col>
                                            <input onChange={() => {
                                                this.setState({volume: event.target.value})
                                            }} type="range" min="1" max="100" value={volume} className="slider"
                                                   id="myRange"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {(isMobile) ?
                                <Row id='row'>
                                    <Col><p style={{
                                        "marginRight": "0px !important",
                                        "fontSize": "10px",
                                        "fontWeight": "bold",
                                        "color": "red",
                                        "textAlign": "center"
                                    }}>Please use desktop for better experience </p></Col>
                                </Row>
                                : ''}
                            <Row className='footer'>
                                <Col className='footerCol'><a id='footer-link' target="_blank"
                                                              href='https://instagram.com/driveandlisten'>Follow us!</a></Col>
                                <Col key='coffee' className='footerCol'><a className="bmc-button" target="_blank"
                                                                           style={{"alignItems": "center"}}
                                                                           href="https://www.buymeacoffee.com/erkam?ref=dnl0"><span
                                    style={{"fontSize": "28px !important"}}>Buy me a coffee</span><img
                                    src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                                    alt="Buy me a coffee"/></a></Col>
                                <Col className='footerCol'><a id='footer-link' target="_blank"
                                                              href={'https://www.youtube.com/watch?v=' + currentVideo}>Video
                                    source</a></Col>
                            </Row>
                        </Container>
                    ) : ''}
                </div>
                <ReactAudioPlayer
                    key={data[selected_city].radio_url[selected_radio]}
                    ref={this.myRef}
                    id='audio'
                    src={!isFirst ? data[selected_city].radio_url[selected_radio] : ''}
                    onPlay={() => {
                        this.audioOnPlay()
                    }}
                    onCanPlay={() => {
                        this.audioOnCanPlay()
                    }}
                    onPause={() => {
                        this.audioOnPause()
                    }}
                    autoPlay={!isMobile || !isFirst}
                    volume={volume / 100.0}
                    controls={false}/>
                {adScript}{bmcScript}
            </div>
        );
    }

    handleScriptCreate() {
        this.setState({scriptLoaded: false})
    }

    handleScriptError() {
        this.setState({scriptError: true})
    }

    handleScriptLoad() {
        this.setState({scriptLoaded: true})
    }
}

function CitiesPopup
(props) {
    const [show, setShow] = React.useState(false);
    const selected_city = props.selected_city;
    const data = props.data;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const videoButtons = props.videoIds.map((id, index) => {

        return (
            <li key={id}>
                <div className='Button Cities' style={{"fontSize": "large"}}
                     id={id === data[selected_city].video_id[0] ? 'active' : ''}
                     onClick={() => {
                         props.onClick(index);
                         setShow(false);
                     }}> {(id === data[selected_city].video_id[0]) ? (data[index].city + ', ' + data[selected_city].country) : data[index].city} </div>
            </li>
        );
    });
    return (
        <div>
            <Col className="mobileButton" variant="primary" onClick={handleShow}>
                {data[selected_city].city}<br/>{'(' + data[selected_city].country + ')'}
            </Col>

            <Modal show={show} onHide={handleClose} scrollable>
                <Modal.Body>{videoButtons}</Modal.Body>
            </Modal>
        </div>
    );
}

function About(props) {
    const [show, setShow] = React.useState(false);
    const currentVideo = props.currentVideo;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            <Row className='footer'>
                <Col className='footerCol' id='footer-link' onClick={handleShow}>About</Col>
                <Col key='coffee' className='footerCol'><a className="bmc-button" target="_blank"
                                                           style={{"alignItems": "center"}}
                                                           href="https://www.buymeacoffee.com/erkam?ref=dnl0"><span
                    style={{"fontSize": "28px !important"}}>Buy me a coffee</span><img
                    src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/></a></Col>
                <Col className='footerCol'></Col>
            </Row>

            <Modal show={show} onHide={handleClose} scrollable>
                <Modal.Title id="contained-modal-title-vcenter">
                    About
                </Modal.Title>
                <Modal.Body>
                    <p style={{'align': 'left !important'}}> Drive & Listen is a web app developed on April 23rd 2020
                        during lockdown to help people to suppress their feeling of missing being on the road. <br/>
                        Videos are from various sources. You can access the source of the current playing video <a
                            id='footer-link' target="_blank" href={'https://www.youtube.com/watch?v=' + currentVideo}>via
                            here.</a>
                    </p>
                    <Row>
                        <Col className='footerCol'><a id='footer-link' target="_blank"
                                                      href='https://twitter.com/driveandlisten'>Twitter</a></Col>
                        <Col className='footerCol'><a id='footer-link' target="_blank"
                                                      href='https://instagram.com/driveandlisten'>Instagram</a></Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

function Bmc(props) {
    const [show, setShow] = React.useState(true);
    const city = props.city;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            <Modal show={show} onHide={handleClose} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Buy Me A Coffee!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className='Gif' src="https://media.giphy.com/media/ceeFbVxiZzMBi/giphy.gif"/>
                    <br/><br/>
                    <p style={{'align': 'left !important'}}> If you like the website you can <a target="_blank"
                                                                                                href="https://buymeacoffee.com/erkam?ref=dnl">buy
                        me a coffee</a> to support me or share it on <a target="_blank"
                                                                        href={'https://twitter.com/intent/tweet?text=' + 'I am driving around ' + city + ' on Drive %26 Listen' + '&url=https://driveandlisten.herokuapp.com&related=driveandlisten'}>Twitter</a> :)
                    </p>
                    <Row>
                        <Col className='footerCol'><a id='footer-link' target="_blank"
                                                      href='https://twitter.com/driveandlisten'>Twitter</a></Col>
                        <Col className='footerCol'><a id='footer-link' target="_blank"
                                                      href='https://instagram.com/driveandlisten'>Instagram</a></Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;



// WEBPACK FOOTER //
// ./src/App.js

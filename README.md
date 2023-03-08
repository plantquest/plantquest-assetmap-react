# @plantquest/assetmap-react

[![npm version](https://img.shields.io/npm/v/@plantquest/assetmap.svg)](https://www.npmjs.com/package/@plantquest/assetmap)

![Logo_Plantquest_horizontal](https://user-images.githubusercontent.com/89012461/223706137-a9682633-cebb-47ab-8bdf-0452e6b7fff4.png)
>PlantQuest is a supplier of asset mapping solutions to the Life Science sector. The industry focused PlantQuest Asset Map allows users to intergrate the PlantQuest mapping technology into their technology stack. Upon doing so, users can manipulate maps and display asset information on maps of their facility helping them to make smart, quicker and more insightful decisions. In turn, increasing their operational effeciency.

## Install

```bash
npm install --save @plantquest/assetmap-react
```

## Usage



## Debug Log

Set `window.PLANTQUEST_ASSETMAP_LOG` to `true` to enable logging.


## Options

* `width`: Pixel width of map ( default: `'600px'` )
* `height`: Pixel height of map ( default: `'400px'` )
* `mapBounds`: Pixel bounds of map
* `mapStart`: Pixel start position of map ( e.g `[y, x]` ( default: `[2925, 3900]` ) )
* `mapStartZoom`: Starting zoom level
* `mapRoomFocusZoom`: Zoom level for room focus
* `mapMaxZoom`: Maximum zoom
* `mapMinZoom`: Minimum zoom
* `states`: State definitions ( optional )
  * `{ [stateName]: { color: COLOR, name: STRING, marker: 'standard'|'alert'}, ...}`
* `start.map`: Starting map ( default: `0` )
* `start.level`: Starting level ( default: `0` )
* `room.color`: Room highlight color ( default: `'#33f'` )

## ReactJS: Quick Example

```js

import { PlantQuestAssetMap } from '@plantquest/assetmap-react'

// enable logging - useful for debugging purposes
window.PLANTQUEST_ASSETMAP_LOG = true

const options = {
  data: 'https://demo.plantquest.app/sample-data.js',
  map: [
    'https://demo.plantquest.app/pqd-pq01-m01-011.png',
    'https://demo.plantquest.app/pqd-pq01-m02-011.png',
  ],
  width: '1000px',
  height: '1000px',
  states: {
    up: { color: '#696', name: 'Up', marker: 'standard' },
    down: { color: '#666', name: 'Down', marker: 'standard' },
    missing: { color: '#f3f', name: 'Missing', marker: 'alert' },
    alarm: { color: '#f33', name: 'Alarm', marker: 'alert' },
    // "color" - color of the polygon of that state
    // "name" - name of the state
    // "marker" - type of marker ( 'standard' | 'alert' ) 
  },
  
  // room highlight color
  room: {
    color: 'red'
  },
  
}

// container when showing an asset
/*
// css example
div.plantquest-assetmap-asset-state-up {
    color: white;
    border: 2px solid #696;
    border-radius: 4px;
    background-color: #696;
    opacity: 0.7;
}
*/
class AssetInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return <div>
         <h3>{this.props.asset.id}</h3>
         <p><i>Building:</i> {this.props.asset.building}</p>
       </div>
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props)
    
    // to keep track of map's state
    // using listeners so we can reuse these in our app
    this.state = {
      map: -1,
      level: '',
      rooms: [],
      showRoom: null,
      showAsset: null,
    }
    

  }
  
  componentDidMount() {
    const PQAM = window.PlantQuestAssetMap
    
    // set up message listener
    PQAM.listen((msg) => {
      // put 'ready' listener to use
      if('ready' === msg.state) {
        // set 'rooms' for reuse
        this.setState({
          rooms: PQAM.data.rooms
        })
      }
      // when a user selects a room
      // "USER SELECT ROOM" example
      else if ('room' === msg.select) {
        // pick a room
        let item = PQAM.data.roomMap[msg.room]
        this.setState({ showRoom: item })
        this.selectRoom(item)
      }
      // "USER SELECT MAP" example
      else if('map' === msg.show) {
        this.setState({ level: msg.level })
        this.setState({ map: msg.map })
      }
      // Listen for "USER SHOW ASSET"
      else if('asset' === msg.show) {
        // use msg.asset
      }
      
    })
  
  }
  
  selectRoom(item) {
    const PQAM = window.PlantQuestAssetMap
    
    // "SEND A MESSAGE" example
    // "SHOW ROOM"
    PQAM.send({
      srv: 'plantquest',
      part: 'assetmap',
      show: 'room',
      room: item.room,
      focus: true,
    })
  
  }
  
  showAsset(asset) {
    const PQAM = window.PlantQuestAssetMap
    
    // "SHOW ASSET" example
    // when showing an asset
    // it's important to first show the room of that asset and then the asset
    PQAM.send({
      srv: 'plantquest',
      part: 'assetmap',
      show: 'room',
      room: asset.room,
      focus: true,
    })
    PQAM.send({
      srv: 'plantquest',
      part: 'assetmap',
      show: 'asset',
      asset: asset.id,
    })
    
    this.setState({ showRoom: asset.room })
    this.setState({ showAsset: asset })
    
  }
  

  render() {
    return (
      <div className="App">
        <PlantQuestAssetMap
          options={options}
          assetinfo={AssetInfo}
        />
      </div>
    )
  }
  
}

```

## Messages

  <h2>SEND MESSAGES</h2>

  <h3>ZOOM</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  zoom: &lt;INTEGER&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;INTEGER&gt;</i>: Zoom level (default: 2 to 6)<br>
  </p>


  <h3>GET RELATION ( REQUIRES A RELATION LISTENER )</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  relate: 'room-asset',
}</pre>
  <p>Listen: <a href="#listen-relation">RELATION</a><br>
  </p>


  <h3>SHOW ROOM</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'room',
  room: &lt;ROOM-ID&gt;,
  focus: &lt;Boolean&gt;,   
}</pre>
  <p>Where:<br>
    <i>&lt;ROOM-ID&gt;</i>: Room Identifier String<br>
    <i>&lt;Boolean&gt;</i>: either true or false - enable focus when a room is shown<br>
  </p>

  <h3>SHOW ASSET</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'asset',
  asset: &lt;ASSET-ID&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;ASSET-ID&gt;</i>: Asset Identifier String<br>
  </p>
  
  <h3>HIDE ASSET</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  hide: 'asset',
  asset: &lt;ASSET-ID&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;ASSET-ID&gt;</i>: Asset Identifier String<br>
  </p>

  <h3>SET ASSET STATE</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'asset',
  state: &lt;STATE&gt;,
  asset: &lt;ASSET-ID&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;STATE&gt;</i>: State String ('up', 'down', 'alarm', 'missing') - states from the <b>options</b> <br>
    <i>&lt;ASSET-ID&gt;</i>: Asset Identifier String<br>
  </p>

  <h3>SHOW MAP</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'map',
  map: &lt;INTEGER&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;INTEGER&gt;</i>: Number of the map<br>
  </p>
  
  
  <h2>LISTEN MESSAGES</h2>
   
  <h3>STATE</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  state: &lt;STATE&gt;,
}</pre>
  <p>Where:<br>
    <i>&lt;STATE&gt;</i>: 'ready' - triggered when the map is fully rendered <br>
  </p>


  <a name="listen-relation"></a>
  <h3>RELATION</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  relate: 'room-asset',
  relation: &lt;RELATION&gt;,
}</pre>
  <p>Where:<br>
    <i>&lt;RELATION&gt;</i>:
    <pre>
      { '&lt;ROOM-ID&gt;': { asset: [ '&lt;ASSET-ID&gt;', ... ] } }</pre>
    ROOM-ASSET RELATION: Get all the rooms IDS containing their asset IDS in that room
    <br>
  </p>

```js
// for example
const PQAM = window.PlantQuestAssetMap
PQAM.listen((msg) => {
  if('room-asset' === msg.relate) {
    // use msg.relation
  }
})
```


  <h3>USER SELECT ROOM</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  select: 'room',
  room: &lt;ROOM-ID&gt;,     
}</pre>
  <p>Where:<br>
    <i>&lt;ROOM-ID&gt;</i>: Room Identifier String<br>
  </p>

  <h3>USER SELECT MAP</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'map',
  map: &lt;INTEGER&gt;,
  level: &lt;STRING&gt;,
}</pre>
  <p>Where:<br>
    <i>&lt;INTEGER&gt;</i>: Number of the map user just selected <br>
    <i>&lt;STRING&gt;</i>: Name of the level of that map <br>
  </p>
  
  <h3>USER SHOW ASSET</h3>
  <pre>
{
  srv: 'plantquest',
  part: 'assetmap',
  show: 'asset',
  asset: &lt;OBJECT&gt;,
}</pre>
  <p>Where:<br>
    <i>&lt;OBJECT&gt;</i>: Metadata of the SHOWN asset <br>
  </p>

## Licenses

[MIT](LICENSE) © [Plantquest Ltd](https://plantquest.com)
[BSD 2-Clause](LEAFLET-LICENSE) © [Vladimir Agafonkin, Cloudmade](https://leafletjs.com/)
[MIT](LICENSE) © [Justin Manley](https://github.com/Leaflet/Leaflet.toolbar)

import React from 'react'
import styles from './styles.module.css'

import '@plantquest/assetmap'

import Pkg from '../package.json'


class PlantQuestAssetMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asset: null,
      assets: null,
    }
  }

  componentDidMount() {
    const reactInfo = {
      name: '@plantquest/assetmap-react',
      version: Pkg.version,
    }
    
    window.PlantQuestAssetMap.log('INFO', reactInfo, window.PlantQuestAssetMap.info)
    window.PlantQuestAssetMap.info.react = reactInfo
    
    window.PlantQuestAssetMap.loc.map = -1
    window.PlantQuestAssetMap.current.started = false
    window.PlantQuestAssetMap.start(this.props.options)
  
    window.PlantQuestAssetMap.listen((msg)=>{
      // console.log(msg)
      if('asset' === msg.show) { // && msg.before) {
        setTimeout(()=>{
          this.setState({asset:msg.asset})
        }, 11)
      }
      else if('clusterclick' === msg.event) {
        setTimeout(()=>{
          this.setState({assets:msg.assetlist})
        }, 11)
      }
    })
  }

  render() {
    let AIC = this.props.assetinfo
    let ACC = this.props.assetcluster
  
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div id="plantquest-assetmap-assetinfo">
          { this.state.asset && AIC ? <AIC asset={this.state.asset}/> : <div></div> }
        </div>
        <div id="plantquest-assetmap-assetcluster">
          { this.state.assets && ACC ? <ACC assets={this.state.assets}/> : <div></div> }
        </div>
        <div id="plantquest-assetmap"></div>
      </div>
    )
  }
}

export {
  PlantQuestAssetMap
}



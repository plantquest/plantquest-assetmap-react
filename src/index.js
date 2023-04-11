import React from 'react'
import styles from './styles.module.css'

import '@plantquest/assetmap'

import Pkg from '../package.json'


class PlantQuestAssetMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asset: null
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
      if('asset' === msg.show && msg.before) {
        this.setState({asset:msg.asset})
      }
    })
  }

  render() {
    let AIC = this.props.assetinfo
  
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div id="plantquest-assetmap-assetinfo">
          { this.state.asset ? <AIC asset={this.state.asset}/> : <div></div> }
        </div>
        <div id="plantquest-assetmap"></div>
      </div>
    )
  }
}

export {
  PlantQuestAssetMap
}



import React from 'react'
import styles from './styles.module.css'

import '@plantquest/assetmap'

import Pkg from '../package.json'


class PlantQuestAssetMini extends React.Component {
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
    
    window.PlantQuestAssetMini.log('INFO', reactInfo, window.PlantQuestAssetMini.info)
    window.PlantQuestAssetMini.info.react = reactInfo
    
    window.PlantQuestAssetMini.loc.map = -1
    window.PlantQuestAssetMini.current.started = false

    window.PlantQuestAssetMini.start(this.props.options, this.props.ready)


    let __pq_info_props__ = (msg) => {
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
    }
    __pq_info_props__.__pq_info_props__ = true
    
    if(null == window.PlantQuestAssetMini.listeners.find(f=>f.__pq_info_props__)) {
      window.PlantQuestAssetMini.listen(__pq_info_props__)
    }
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
  PlantQuestAssetMini
}



import React from 'react'
import styles from './styles.module.css'

import '@plantquest/assetmap'

import Pkg from '../package.json'


class PlantQuestAssetMap extends React.Component {
  constructor(props) {
    super(props)

    if(null == props.id) {
      throw new Error('PlantQuestAssetMap id prop missing')
    }
    
    this.state = {
      asset: null,
      assets: null,
    }
  }

  
  componentDidMount() {
    console.log('PQ MOUNT')
    
    const reactInfo = {
      name: '@plantquest/assetmap-react',
      version: Pkg.version,
    }

    let pqam = window.PlantQuestAssetMap.make(this.props.id)

    pqam.log('INFO', reactInfo, window.PlantQuestAssetMap.info)
    pqam.info.react = reactInfo
    
    let pqamReady = (err) => {
      if(err) {
        if(this.props.ready) {
          this.props.ready(err, pqam)
        }
        return
      } 

      let __pq_info_props__ = (msg) => {
        if('asset' === msg.show) { 
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
      pqam.listen(__pq_info_props__)

      if(this.props.ready) {
        this.props.ready(null, pqam)
      } 
      
      // if(null == window.PlantQuestAssetMap.listeners.find(f=>f.__pq_info_props__)) {
      // window.PlantQuestAssetMap.listen(__pq_info_props__)
      // }
    }

    if(pqam.current.started) {
      pqam.render()
    }
    else {
      pqam.start(this.props.options, pqamReady)
    }
    
    // window.PlantQuestAssetMap.loc.map = -1
    // window.PlantQuestAssetMap.current.started = false
    // window.PlantQuestAssetMap.start(this.props.options, this.props.ready)
  }

  
  render() {
    let AIC = this.props.assetinfo
    let ACC = this.props.assetcluster
  
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div id="plantquest-assetmap-assetinfo">
          { this.state.asset &&
            AIC ? <AIC asset={this.state.asset}/> : <div></div> }
        </div>
        <div id="plantquest-assetmap-assetcluster">
          { this.state.assets &&
            ACC ? <ACC assets={this.state.assets}/> : <div></div> }
        </div>
        <div id="plantquest-assetmap"></div>
      </div>
    )
  }
}

export {
  PlantQuestAssetMap
}



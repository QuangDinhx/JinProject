import {
    Mesh,
    MeshBasicMaterial,
    Scene,
    BufferGeometry,
    Object3D,
    Geo
    
  } from "three"
  
  
  const isMesh = (obj)=> {
    //@ts-ignore
    return obj.isMesh
  }
  // const isBufferGeometry = (obj: any): obj is BufferGeometry => {
  //   return obj.isBufferGeometry
  // }
  const isGeometry = (obj) => {
    return obj.isGeometry
  }
  
  const toRenderableGeometry = (
    geom
  ) => {
    if (isGeometry(geom)) {
      return geom
    }
    // Try to convert BufferGeometry (not stable...)
    if (geom.index === null && !geom.getAttribute("position")) {
      return null
    }
    try {
      const buf = new BufferGeometry().fromBufferGeometry(geom)
      return buf
    } catch (e) {
      console.warn(`skip: ${geom}`)
      return null
    }
  }
  
  export const toRenderble = (scene) => {
    let tmpGeometry = new BufferGeometry()
  
    const cloneScene = scene.clone()
    cloneScene.traverse((mesh) => {
      if (!isMesh(mesh)) return
      if (!mesh.geometry) {
        return
      }
  
      // Convert geometry
      const appendGeom = toRenderableGeometry(mesh.geometry)
      if (!appendGeom) {
        return null
      }
  
      // merge parent matrix
      if (mesh.parent) {
        mesh.parent.updateMatrixWorld()
        mesh.applyMatrix(mesh.parent.matrixWorld)
      }
  
      mesh.geometry = appendGeom
      tmpGeometry.mergeMesh(mesh)
    })
  
    // generate output scene
    const outputScene = new Scene()
    const buf = new BufferGeometry().copy(tmpGeometry)
    const mesh = new Mesh(buf, new MeshBasicMaterial())
    outputScene.add(mesh)
    return outputScene
  }
  
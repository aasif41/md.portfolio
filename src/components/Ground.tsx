import { useMemo } from 'react'
import * as THREE from 'three'

// Reusable black material for toon outline
const blackMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.BackSide })

export default function Ground({ seed = 0 }: { seed?: number }) {
  // Use a pseudo-random seed to place a rock occasionally
  const hasRock = useMemo(() => {
    const x = Math.sin(seed + 1234) * 10000
    return (x - Math.floor(x)) > 0.75
  }, [seed])

  const rock = useMemo(() => {
    const x = Math.sin(seed + 5678) * 10000
    const rand = x - Math.floor(x)
    return {
      x: rand > 0.5 ? 4.2 + rand : -4.2 - rand,
      y: 0.4 + rand * 0.2,
      z: (rand - 0.5) * 6,
      scale: 1.2 + rand * 0.8,
      rotX: rand * Math.PI,
      rotY: rand * Math.PI * 2,
      rotZ: rand * Math.PI,
    }
  }, [seed])

  // Generate random grass tufts along the path edges
  const grassTufts = useMemo(() => {
    const tufts = []
    for (let i = 0; i < 4; i++) {
      const isLeft = i % 2 === 0
      const randX = Math.sin(seed + i * 11) * 10000
      const randZ = Math.sin(seed + i * 17) * 10000
      
      const x = isLeft ? -2.6 - (randX - Math.floor(randX)) * 1.5 : 2.6 + (randX - Math.floor(randX)) * 1.5
      const z = (randZ - Math.floor(randZ)) * 7.5 - 3.75
      const rotY = (randX - Math.floor(randX)) * Math.PI * 2
      
      tufts.push({ x, z, rotY })
    }
    return tufts
  }, [seed])

  const coneGeo = useMemo(() => new THREE.ConeGeometry(0.15, 0.5, 3), [])

  return (
    <group>
      {/* Ground Segment - Slightly longer than 7.5 to prevent seams */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[70, 7.6]} />
        <meshStandardMaterial color="#88b59e" roughness={0.9} flatShading />
      </mesh>

      {/* Center Pathway Strip */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[4.8, 7.6]} />
        <meshStandardMaterial color="#d4ded9" roughness={0.8} flatShading />
      </mesh>

      {/* Grass Tufts */}
      {grassTufts.map((tuft, i) => (
        <group key={`grass-${i}`} position={[tuft.x, 0.25, tuft.z]} rotation={[0, tuft.rotY, 0]}>
          <mesh geometry={coneGeo} castShadow rotation={[0.1, 0, 0.2]} position={[-0.1, 0, 0]}>
            <meshStandardMaterial color="#6fa883" roughness={0.9} flatShading />
          </mesh>
          <mesh geometry={coneGeo} scale={1.1} rotation={[0.1, 0, 0.2]} position={[-0.1, 0, 0]} material={blackMaterial} />
          
          <mesh geometry={coneGeo} castShadow rotation={[-0.1, 0.5, -0.2]} position={[0.1, -0.05, 0]}>
            <meshStandardMaterial color="#6fa883" roughness={0.9} flatShading />
          </mesh>
          <mesh geometry={coneGeo} scale={1.1} rotation={[-0.1, 0.5, -0.2]} position={[0.1, -0.05, 0]} material={blackMaterial} />
        </group>
      ))}

      {/* Low-Poly Boulder */}
      {hasRock && (
        <group 
          position={[rock.x, rock.y, rock.z]} 
          rotation={[rock.rotX, rock.rotY, rock.rotZ]}
          scale={[rock.scale, rock.scale, rock.scale]}
        >
          <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#b8c0c4" roughness={0.75} flatShading />
          </mesh>
          <mesh scale={1.015} material={blackMaterial}>
            <dodecahedronGeometry args={[1, 0]} />
          </mesh>
        </group>
      )}
    </group>
  )
}

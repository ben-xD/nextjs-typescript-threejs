import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useRef} from 'react'
import {World} from '../src/world';

export default function Home() {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef) console.warn("Canvas was null. Not doing anything.");

    let world = new World(canvasRef.current!);
    return () => {
      world.close();
    }
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/*<canvas ref={canvasRef}></canvas>*/}
        <canvas ref={canvasRef}></canvas>
      </main>
    </>
  )
}

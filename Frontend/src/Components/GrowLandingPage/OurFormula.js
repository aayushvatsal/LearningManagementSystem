import React from 'react';
import styles from '../../Styles/OurFormula.module.css';

const OurFormula = () => {
    return (
        <div className={styles.formulaSection}>
            <h1 className={styles.formulaTitle}>
                Our formula for <span className={styles.titleHighlight}>success</span>.
            </h1>
            <div className={styles.videoContainer}>

                <iframe
                    className={styles.videoFrame}
                    width="560" height="315"
                    src="https://www.youtube.com/embed/W3GgHmfRDRo?si=I04Iwg56_4JGLVBg"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>

                </iframe>
            </div>
        </div>
    );
};

export default OurFormula;

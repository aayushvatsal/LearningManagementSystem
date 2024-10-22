import React from 'react';
import styles from '../../Styles/Worth.module.css';

const Worth = () => {
    return (
        <div className={styles.formulaSection}>
            <h1 className={styles.formulaTitle}>
                Is Grow UP Start Worth <span className={styles.titleHighlight}>7%?</span>.
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
            <p className={styles.learnMoreText}>
                <a href="https://kavishala.com/" className={styles.learnMoreLink}>
                    Learn more
                </a>{' '}
                about evaluating equity.
            </p>
        </div>
    );
};

export default Worth;

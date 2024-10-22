"use client";

import React from "react";
import Image from "next/image";
import styles from "../Styles/Powerful.module.css";

import PowerfulFeature1 from "../Images/PowerFulFeatureImage1.jpg";
import PowerfulFeature2 from "../Images/PowerFulFeatureImage2.png";
import PowerfulFeature3 from "../Images/PowerFulFeatureImage3.jpg";
import PowerfulFeature4 from "../Images/PowerFulFeatureImage4.jpeg";

const PowerfulFeature = () => {
    return (
        <div className={styles.PowerfulContainer}>
            <h2 className={styles.PowerfulTitle}>Powerful Features</h2>
            <p className={styles.SubPowerfulTitle}>
                Special features which help you keep students on track and engaged during class time.
            </p>

            <div className={styles.FeaturesGrid}>
                <div className={styles.FeatureItem}>
                    <blockquote className={styles.Quote}>
                        “Learning happens everywhere, all the time and we are here to ensure that you are connected
                        with the learning community when it happens.”
                    </blockquote>
                    <Image
                        src={PowerfulFeature1}
                        alt="Feature 1"
                        className={styles.FeatureImage}
                        layout="responsive"
                        width={600}
                        height={400}
                    />
                </div>

                <div className={styles.FeatureItem}>
                    <Image
                        src={PowerfulFeature2}
                        alt="View students Screens"
                        className={styles.FeatureImage}
                        layout="responsive"
                        width={600}
                        height={400}
                    />
                    <h3 className={styles.FeaturePowerfulTitle}>View students Screens</h3>
                    <p className={styles.FeatureText}>
                        Teachers can see everything their students are doing on their computers. This allows them to keep track and see who needs extra help.
                    </p>
                    <button className={styles.LearnMoreButton}>Learn more</button>
                </div>

                <div className={styles.FeatureItem}>
                    <Image
                        src={PowerfulFeature3}
                        alt="Assignment & Quiz"
                        className={styles.FeatureImage}
                        layout="responsive"
                        width={600}
                        height={400}
                    />
                    <h3 className={styles.FeaturePowerfulTitle}>Assignment & Quiz</h3>
                    <p className={styles.FeatureText}>
                        Teachers can create an assignment or quiz and schedule it to post later, with due date and time and add attachments.
                    </p>
                    <button className={styles.LearnMoreButton}>Learn more</button>
                </div>

                <div className={styles.FeatureItem}>
                    <Image
                        src={PowerfulFeature4}
                        alt="Easy Attendance Tracking"
                        className={styles.FeatureImage}
                        layout="responsive"
                        width={600}
                        height={400}
                    />
                    <h3 className={styles.FeaturePowerfulTitle}>Easy Attendance Tracking</h3>
                    <p className={styles.FeatureText}>
                        Automate attendance seamlessly to efficiently keep accurate track of all students and effectively avoid any potential confusion.
                    </p>

                    <button className={styles.LearnMoreButton}>Learn more</button>
                </div>
            </div>
        </div>
    );
};

export default PowerfulFeature;

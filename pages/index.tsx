import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'

import { Button, Container, Row, Col, Spacer, Text, Input } from "@nextui-org/react";


import robotImage from "@/public/robot.png";

import { useState, useEffect } from "react";

import { ChangeEvent } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const handleUsername = (e: ChangeEvent<FormElement>) => {
		setEmail(e.currentTarget.value);
		if (validateEmail(e.currentTarget.value)) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

  return (
    <Layout>
        <Container className={styles.container} alignItems='center'>
          <Row className={styles.row} align='center' gap={2}>
            <Col className={styles.col}>
              <Text
              style={{
                // fontFamily: 'Inter';
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "80px",
                lineHeight: "97px",
              }}
              >
                Chatibility
              </Text>
              <Image
                alt='Robot image'
                src={robotImage}
                height="100"
                style={{
                  objectFit: "cover",
                  // width: "100%",
                  height: "auto",
                }}
              />
              <Text
                style={{
                    // fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: "200",
                    fontSize: "28px",
                    lineHeight: "34px",
                    textAlign: "center",
                    color: "#000000",
                }}
              >
              The worlds first most accessible chatbot which uses ChatGPT and will take your website to the next level
              </Text>
            </Col>
          <Col className={styles.col}>
            <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "48px",
              lineHeight: "58px",
            }}
            >Log in</Text>
            <form>
            <Input
								size='xl'
								id='username'
								name='username'
								placeholder='Enter your username'
								type='text'
								onChange={handleUsername}
							/>

            </form>
          
          </Col>
          </Row>
        </Container>
    </Layout>
  )
}

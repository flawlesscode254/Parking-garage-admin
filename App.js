import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, SafeAreaView, ToastAndroid } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { Input, Button, Overlay } from 'react-native-elements'
import { db } from './firebase'
import firebase from 'firebase'

const settings = () => {
    const [code, setCode] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [plate, setPlate] = useState('')
    const [time, setTime] = useState('')
    const [parking, setParking] = useState('')
    const [total, setTotal] = useState('')
    const [button, setButtom] = useState(true)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      (name && email && phone && plate && time) ? setButtom(false) : setButtom(true)
    }, [name, email, phone, plate, time])

    const decrement = firebase.firestore.FieldValue.increment(-total)
    const dec = firebase.firestore.FieldValue.increment(-1)

    const Stat = () => {
      db.collection("coordinates").doc(parking).update({
        spaces: dec
      })
    }


    const Reduce = async () => {
      await setVisible(!visible);
        await db.collection('money').doc(email + phone).update({
                amount: decrement,
                deduct: total
              })
              .then( async () => {
                await Stat()
                await db.collection('orders').doc(email).delete()
                await setName('')
                await setEmail('')
                await setPhone('')
                await setPlate('')
                await setTime('')
                await setParking('')
                await setTotal('')
                await setVisible(visible)
                await ToastAndroid.show('Successfully charged the user', ToastAndroid.LONG);
              })
    }

    const Check = async () => {
        await setVisible(!visible);
        await db.collection('orders').where('code', '==', Number(code)).get().then((snapshot) => {
            snapshot.forEach(doc => {
                setName(doc.data().name)
                setEmail(doc.data().email)
                setPhone(doc.data().phone)
                setPlate(doc.data().plate)
                setParking(doc.data().parking)
                const date = doc.data().time.toDate()
                setTime("" + date)
                const one = new Date(date).getHours() * 3600
                const two = new Date(date).getMinutes() * 60
                const three = one + two
                const four = new Date();
                const five = four.getHours() * 3600
                const six = four.getMinutes() * 60
                const seven = five + six
                const eight = seven - three
                setTotal(Math.round(eight * 0.01))
            })
            setCode('')
        })
        await setVisible(visible)
    }

    return (
      <SafeAreaView>
             <KeyboardAvoidingView style={styles.container}>
            <ScrollView style={{
              marginTop: 70
            }}>
                <Text style={{
                  textAlign: "center"
                }}>Information control center</Text>
                <Text style={{
                    marginTop: 20,
                    textAlign: "center"
                }}>Enter the unique code to view the details</Text>
                <Input 
                  value={code} 
                  keyboardType="numeric"
                  onChangeText={(text) => setCode(text)} 
                  style={{
                    marginTop: 30
                }} placeholder="Enter the unique code" />
                
            </ScrollView>
            <View style={{
              justifyContent: "center",
              alignItems: "center",
              display: 'flex'
            }}>
              <Button disabled={!code} onPress={Check} title="Submit" />
            </View>
            <View style={{
              backgroundColor: '#5359D1',
              padding: 10,
              borderRadius: 25,
              marginTop: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 40,
              marginRight: 40
            }}>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{name}</Text>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{email}</Text>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{phone}</Text>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{plate}</Text>
                 <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{parking}</Text>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{time}</Text>
                <Text style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{total}</Text>
                
            </View>

            <View style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Button disabled={button} raised title="Charge" onPress={Reduce} />
            </View>

            <View>
                <Overlay isVisible={visible}>
                    <Text>Processing...</Text>
                </Overlay>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
   
        
    )
}

export default settings

const styles = StyleSheet.create({})
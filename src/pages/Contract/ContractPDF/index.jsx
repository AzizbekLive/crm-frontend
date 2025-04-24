import React from 'react';
import { Page, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
        display: 'block',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

// Create Document Component
const ContractPDF = () => {
    const contract = {
        id: 10,
        firstName: 'John',
        lastName: 'Doe',
        passportSeries: 'AA1234567',
        phoneNumber1: '+998901234567',
        phoneNumber2: '+998902345678',
        address: '123 Main Street, Tashkent',
        currentAddress: '456 Current Street, Tashkent',
        createdAt: 1745469664,
        apartments: [
            {
                id: 3,
                rooms: 5,
                totalArea: 70,
                floor: 11,
                block: 28,
                totalPrice: 620000000,
                contractDetails: {
                    id: 3,
                    clientId: 10,
                    apartmentId: 3,
                    initialPayment: 100000000,
                    monthsDuration: 12,
                    discount: 5,
                    discountedAmount: 31000000,
                    paymentStartDate: '2024-03-20',
                    createdAt: 1745469664,
                },
            },
        ],
    };
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>Don Quijote de la Mancha</Text>
                <Text style={styles.author}>Miguel de Cervantes</Text>
                <Text style={styles.subtitle}>Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D. Quijote de la Mancha</Text>
                <Text style={styles.text}>{contract.firstName}</Text>
                <Text style={styles.text}>{contract.lastName}</Text>
                <Text style={styles.text}>{contract.passportSeries}</Text>
                <Text style={styles.text}>{contract.currentAddress}</Text>
                <Text style={styles.text}>{JSON.stringify(contract)}</Text>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed={true} />
            </Page>
        </Document>
    );
};

export default ContractPDF;

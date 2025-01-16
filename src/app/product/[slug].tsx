import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications';
import { PRODUCTS } from '../../../assets/products';
import { useCartStore } from '../../store/cart-store';
import { useState } from 'react';

const ProductDetails = () => {
    const {slug} = useLocalSearchParams<{slug: string}>();
    const toast = useToast();
    const product = PRODUCTS.find(product => product.slug === slug)

    if (!product) return <Redirect href='/404' />

    const {items, addItem, incrementItem, decrementItem} = useCartStore();

    const cartItem = items.find(item => item.id === product.id);

    const initialQuantity = cartItem ? cartItem.quantity : 1;

    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {}

    const decreaseQuantity = () => {}

    const addToCart = () => {}

    const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: product.title}} />
      <Image
        source={product.heroImage}
        style={styles.heroImage}
      />
      <View style={styles.productFirstView}>
        <Text style={styles.title}>Title: {product.title}</Text>
        <Text style={styles.slug}>slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Unit Price: ${product.price.toFixed(2)}</Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View>

        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />
      </View>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productFirstView: {
    padding: 18,
    flex: 1
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontWeight: 'bold',
    color: '#000',
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
    marginTop: 20,
  },
})
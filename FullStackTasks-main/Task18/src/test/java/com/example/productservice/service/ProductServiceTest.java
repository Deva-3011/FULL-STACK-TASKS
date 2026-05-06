package com.example.productservice.service;

import com.example.productservice.entity.Product;
import com.example.productservice.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void testGetAllProducts() {
        Product product1 = new Product(1L, "Product1", 10.0);
        Product product2 = new Product(2L, "Product2", 20.0);
        List<Product> products = Arrays.asList(product1, product2);

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.getAllProducts();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Product1");
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProductById_Success() {
        Product product = new Product(1L, "Product1", 10.0);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Product result = productService.getProductById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Product1");
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testGetProductById_NotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        Product result = productService.getProductById(1L);

        assertThat(result).isNull();
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveProduct() {
        Product product = new Product(null, "Product1", 10.0);
        Product savedProduct = new Product(1L, "Product1", 10.0);

        when(productRepository.save(product)).thenReturn(savedProduct);

        Product result = productService.saveProduct(product);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productRepository).deleteById(1L);

        productService.deleteProduct(1L);

        verify(productRepository, times(1)).deleteById(1L);
    }
}

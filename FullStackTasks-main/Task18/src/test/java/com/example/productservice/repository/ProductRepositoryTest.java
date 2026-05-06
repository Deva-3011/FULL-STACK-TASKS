package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void testSaveProduct() {
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(15.0);

        Product savedProduct = productRepository.save(product);

        assertThat(savedProduct).isNotNull();
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isEqualTo("Test Product");
        assertThat(savedProduct.getPrice()).isEqualTo(15.0);
    }

    @Test
    void testFindAllProducts() {
        Product product1 = new Product();
        product1.setName("Product1");
        product1.setPrice(10.0);
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Product2");
        product2.setPrice(20.0);
        productRepository.save(product2);

        Iterable<Product> products = productRepository.findAll();

        assertThat(products).hasSize(2);
    }

    @Test
    void testFindById() {
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(15.0);
        Product savedProduct = productRepository.save(product);

        Product foundProduct = productRepository.findById(savedProduct.getId()).orElse(null);

        assertThat(foundProduct).isNotNull();
        assertThat(foundProduct.getName()).isEqualTo("Test Product");
    }

    @Test
    void testDeleteProduct() {
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(15.0);
        Product savedProduct = productRepository.save(product);

        productRepository.deleteById(savedProduct.getId());

        assertThat(productRepository.findById(savedProduct.getId())).isEmpty();
    }
}

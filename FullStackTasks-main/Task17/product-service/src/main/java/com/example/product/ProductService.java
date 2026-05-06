package com.example.product;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    public List<Product> getAllProducts() {
        return Arrays.asList(
                new Product(1L, "Product1", 10.0),
                new Product(2L, "Product2", 20.0)
        );
    }

    public Product getProductById(Long id) {
        return getAllProducts().stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
    }

}

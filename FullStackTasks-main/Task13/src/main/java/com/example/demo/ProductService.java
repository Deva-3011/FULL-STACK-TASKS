package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product save(Product p) {
        return repo.save(p);
    }

    public Product update(Long id, Product p) {
        Product existing = getById(id);
        existing.setName(p.getName());
        existing.setPrice(p.getPrice());
        existing.setQuantity(p.getQuantity());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

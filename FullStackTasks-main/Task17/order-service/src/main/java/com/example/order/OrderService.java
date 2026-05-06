package com.example.order;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private WebClient.Builder webClientBuilder;

    @CircuitBreaker(name = "productService", fallbackMethod = "fallbackGetProducts")
    public Mono<List<Product>> getProducts() {
        logger.info("Calling product service");
        return webClientBuilder.build()
                .get()
                .uri("http://product-service/products")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Product>>() {
                });
    }

    public Mono<List<Product>> fallbackGetProducts(Throwable t) {
        logger.error("Fallback triggered: {}", t.getMessage());
        return Mono.just(List.of(new Product(0L, "Fallback Product", 0.0)));
    }

}

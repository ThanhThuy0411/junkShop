package js.junkShop.controller;

import js.junkShop.dto.product.ProductDto;
import js.junkShop.service.product.IProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
public class ProductController {
    private final IProductService productService;
    public ProductController(IProductService productService){ this.productService=productService;}

    @PostMapping("/product")
    public ResponseEntity<ProductDto> create(@RequestBody ProductDto newProduct) {
        try {
            ProductDto createdP = productService.createProduct(newProduct);
            return new ResponseEntity<>(createdP, HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/product/{productId}")
    public  ResponseEntity<ProductDto> update(@RequestBody ProductDto product, @PathVariable UUID productId){
        try {
            ProductDto updatedP = productService.updateProduct(product,productId);
            return new ResponseEntity<>(updatedP,HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("product/{productId}")
    public ResponseEntity<ProductDto> get(@PathVariable UUID productId){
        try {
            ProductDto product = productService.getById(productId);
            return new ResponseEntity<>(product,HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/product/{productId}")
    public ResponseEntity<HttpStatus> delete (@PathVariable UUID productId){
        try {
            productService.delete(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

package js.junkShop.controller;

import js.junkShop.dto.order.OrderDto;
import js.junkShop.service.order.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
public class OrderController {
    private final IOrderService orderService;
    public OrderController(IOrderService orderService){ this.orderService=orderService;}

    @PostMapping("/order")
    public ResponseEntity<OrderDto> create(@RequestBody OrderDto newOrder) {
        try {
            OrderDto createdOd = orderService.createOrder(newOrder);
            return new ResponseEntity<>(createdOd, HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/order/{orderId}")
    public  ResponseEntity<OrderDto> update(@RequestBody OrderDto order, @PathVariable UUID orderId){
        try {
            OrderDto updatedOd = orderService.updateOrder(order,orderId);
            return new ResponseEntity<>(updatedOd,HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("order/{orderId}")
    public ResponseEntity<OrderDto> get(@PathVariable UUID orderId){
        try {
            OrderDto order = orderService.getById(orderId);
            return new ResponseEntity<>(order,HttpStatus.OK);
        }
        catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<HttpStatus> delete (@PathVariable UUID orderId){
        try {
            orderService.delete(orderId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

package com.learn.nexus_ims.controller;

import com.learn.nexus_ims.dtos.InvoiceDto;
import com.learn.nexus_ims.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@CrossOrigin
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    /**
     * Create a new invoice
     */
    @PostMapping
    public ResponseEntity<InvoiceDto> createInvoice(@RequestBody InvoiceDto invoiceDto) {
        return new ResponseEntity<>(invoiceService.createInvoice(invoiceDto), HttpStatus.CREATED);
    }

    /**
     * Get all invoices
     */
    @GetMapping
    public ResponseEntity<List<InvoiceDto>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    /**
     * Get invoice by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDto> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }

    /**
     * Update an invoice
     */
    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDto> updateInvoice(@PathVariable Long id, @RequestBody InvoiceDto invoiceDto) {
        return ResponseEntity.ok(invoiceService.updateInvoice(id, invoiceDto));
    }

    /**
     * Delete an invoice
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get invoice by invoice number
     */
    @GetMapping("/invoiceNo/{invoiceNo}")
    public ResponseEntity<InvoiceDto> getInvoiceByInvoiceNo(@PathVariable Integer invoiceNo) {
        return ResponseEntity.ok(invoiceService.getInvoiceByInvoiceNo(invoiceNo));
    }

    /**
     * Get invoices by estimated ID
     */
    @GetMapping("/estimated/{estimatedId}")
    public ResponseEntity<List<InvoiceDto>> getInvoicesByEstimatedId(@PathVariable Long estimatedId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByEstimatedId(estimatedId));
    }

    /**
     * Get invoices by chain ID
     */
    @GetMapping("/chain/{chainId}")
    public ResponseEntity<List<InvoiceDto>> getInvoicesByChainId(@PathVariable Long chainId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByChainId(chainId));
    }

    /**
     * Get invoices by email ID
     */
    @GetMapping("/email/{emailId}")
    public ResponseEntity<List<InvoiceDto>> getInvoicesByEmailId(@PathVariable String emailId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByEmailId(emailId));
    }

    /**
     * Get invoices by service details
     */
    @GetMapping("/service/{serviceDetails}")
    public ResponseEntity<List<InvoiceDto>> getInvoicesByServiceDetails(@PathVariable String serviceDetails) {
        return ResponseEntity.ok(invoiceService.getInvoicesByServiceDetails(serviceDetails));
    }
}

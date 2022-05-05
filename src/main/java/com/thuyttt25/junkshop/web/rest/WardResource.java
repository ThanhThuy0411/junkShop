package com.thuyttt25.junkshop.web.rest;

import com.thuyttt25.junkshop.repository.WardRepository;
import com.thuyttt25.junkshop.service.WardService;
import com.thuyttt25.junkshop.service.dto.WardDTO;
import com.thuyttt25.junkshop.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api")
public class WardResource {

    private final Logger log = LoggerFactory.getLogger(WardResource.class);

    private static final String ENTITY_NAME = "ward";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WardService wardService;

    private final WardRepository wardRepository;

    public WardResource(WardService wardService, WardRepository wardRepository) {
        this.wardService = wardService;
        this.wardRepository = wardRepository;
    }

    @PostMapping("/wards")
    public ResponseEntity<WardDTO> createWard(@RequestBody WardDTO wardDTO) throws URISyntaxException {
        log.debug("REST request to save Ward : {}", wardDTO);
        if (wardDTO.getId() != null) {
            throw new BadRequestAlertException("A new ward cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WardDTO result = wardService.save(wardDTO);
        return ResponseEntity
            .created(new URI("/api/wards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/wards/{id}")
    public ResponseEntity<WardDTO> updateWard(@PathVariable(value = "id", required = false) final Long id, @RequestBody WardDTO wardDTO)
        throws URISyntaxException {
        log.debug("REST request to update Ward : {}, {}", id, wardDTO);
        if (wardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wardDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WardDTO result = wardService.update(wardDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wardDTO.getId().toString()))
            .body(result);
    }

    @PatchMapping(value = "/wards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WardDTO> partialUpdateWard(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody WardDTO wardDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ward partially : {}, {}", id, wardDTO);
        if (wardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wardDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WardDTO> result = wardService.partialUpdate(wardDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wardDTO.getId().toString())
        );
    }

    @GetMapping("/wards")
    public ResponseEntity<List<WardDTO>> getAllWards(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Wards");
        Page<WardDTO> page = wardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/wards/{id}")
    public ResponseEntity<WardDTO> getWard(@PathVariable Long id) {
        log.debug("REST request to get Ward : {}", id);
        Optional<WardDTO> wardDTO = wardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wardDTO);
    }

    @DeleteMapping("/wards/{id}")
    public ResponseEntity<Void> deleteWard(@PathVariable Long id) {
        log.debug("REST request to delete Ward : {}", id);
        wardService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

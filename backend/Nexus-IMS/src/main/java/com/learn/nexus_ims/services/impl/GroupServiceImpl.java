package com.learn.nexus_ims.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.learn.nexus_ims.dtos.GroupDto;
import com.learn.nexus_ims.entities.Group;
import com.learn.nexus_ims.repositories.GroupRepository;
import com.learn.nexus_ims.services.GroupService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;

    @Override
    public GroupDto createGroup(GroupDto groupDto) {
        Group group = new Group();
        group.setGroup_name(groupDto.getName());
        group.setIs_active(groupDto.getStatus() == null || "ACTIVE".equalsIgnoreCase(groupDto.getStatus()));
        group.setCreated_at(LocalDateTime.now());
        group.setUpdated_at(LocalDateTime.now());

        Group saved = groupRepository.save(group);

        GroupDto out = new GroupDto();
        out.setId(saved.getGroup_id());
        out.setSrNo(null);
        out.setName(saved.getGroup_name());
        out.setStatus(saved.getIs_active() != null && saved.getIs_active() ? "ACTIVE" : "INACTIVE");
        out.setCreated_at(saved.getCreated_at());
        out.setUpdated_at(saved.getUpdated_at());
        return out;
    }

    @Override
    public GroupDto updateGroup(Long groupId, GroupDto groupDto) {
        Group group = groupRepository.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));
        if (groupDto.getName() != null) {
            group.setGroup_name(groupDto.getName());
        }
        if (groupDto.getStatus() != null) {
            group.setIs_active("ACTIVE".equalsIgnoreCase(groupDto.getStatus()));
        }
        group.setUpdated_at(LocalDateTime.now());

        Group saved = groupRepository.save(group);

        GroupDto out = new GroupDto();
        out.setId(saved.getGroup_id());
        out.setSrNo(null);
        out.setName(saved.getGroup_name());
        out.setStatus(saved.getIs_active() != null && saved.getIs_active() ? "ACTIVE" : "INACTIVE");
        out.setCreated_at(saved.getCreated_at());
        out.setUpdated_at(saved.getUpdated_at());
        return out;
    }

    @Override
    public void deleteGroup(Long groupId) {
        groupRepository.deleteById(groupId);
    }

    @Override
    public List<GroupDto> getAllGroups() {
        return groupRepository.findAll().stream()
            .map(group -> {
                GroupDto out = new GroupDto();
                out.setId(group.getGroup_id());
                out.setSrNo(null);
                out.setName(group.getGroup_name());
                out.setStatus(group.getIs_active() != null && group.getIs_active() ? "ACTIVE" : "INACTIVE");
                out.setCreated_at(group.getCreated_at());
                out.setUpdated_at(group.getUpdated_at());
                return out;
            })
            .collect(Collectors.toList());
    }

    @Override
    public GroupDto getGroupById(Long groupId) {
        return groupRepository.findById(groupId)
            .map(group -> {
                GroupDto out = new GroupDto();
                out.setId(group.getGroup_id());
                out.setSrNo(null);
                out.setName(group.getGroup_name());
                out.setStatus(group.getIs_active() != null && group.getIs_active() ? "ACTIVE" : "INACTIVE");
                out.setCreated_at(group.getCreated_at());
                out.setUpdated_at(group.getUpdated_at());
                return out;
            })
            .orElseThrow(() -> new RuntimeException("Group not found"));
    }
}

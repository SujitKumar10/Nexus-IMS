package com.learn.nexus_ims.services;

import java.util.List;

import com.learn.nexus_ims.dtos.GroupDto;

public interface GroupService {
    GroupDto createGroup(GroupDto groupDto);
    GroupDto updateGroup(Long groupId, GroupDto groupDto);
    void deleteGroup(Long groupId);
    List<GroupDto> getAllGroups();
    GroupDto getGroupById(Long groupId);
}

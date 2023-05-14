import {Get, Controller } from '@nestjs/common';

import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {

	constructor(private readonly tagService: TagService) {}

	@ApiOperation({ summary: 'Get all tags' })
	@ApiResponse({ status: 200, description: 'Return all tags.'})
	@Get()
	async findAll(): Promise<TagEntity[]> {
		return await this.tagService.findAll();
	}

}